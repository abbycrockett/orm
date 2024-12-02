module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define("Property", {
      propertyNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Property;
  };