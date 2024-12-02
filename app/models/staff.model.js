module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define("Staff", {
      staffNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Staff;
  };