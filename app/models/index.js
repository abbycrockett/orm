const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.property = require("./property.model.js")(sequelize, Sequelize);
db.propertyInspection = require("./propertyInspection.model.js")(sequelize, Sequelize);
db.staff = require("./staff.model.js")(sequelize, Sequelize);

// foreign key for property inspections
db.property.hasMany(db.propertyInspection, { as: "inspections", foreignKey: { name: 'propertyNo', allowNull: false }, onDelete: "CASCADE" });
db.propertyInspection.belongsTo(db.property, { as: "property", foreignKey: { name: 'propertyNo', allowNull: false }, onDelete: "CASCADE" });

// foreign key for staff
db.staff.hasMany(db.propertyInspection, { as: "inspections", foreignKey: { name: 'staffNo', allowNull: false }, onDelete: "CASCADE" });
db.propertyInspection.belongsTo(db.staff, { as: "staff", foreignKey: { name: 'staffNo', allowNull: false }, onDelete: "CASCADE" });

db.sequelize.sync().then(() => {
  // Ensure the auto-increment starts from 1
  sequelize.query("ALTER TABLE Properties AUTO_INCREMENT = 1");
  sequelize.query("ALTER TABLE Staffs AUTO_INCREMENT = 1");
});

module.exports = db;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("../routes/propertyInspection.routes.js")(app);
require("../routes/property.routes")(app);
require("../routes/staff.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
