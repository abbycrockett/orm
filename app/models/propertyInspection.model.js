module.exports = (sequelize, Sequelize) => {
    const PropertyInspection = sequelize.define("PropertyInspection", {
      propertyNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      iDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      iTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
      },
      staffNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return PropertyInspection;
  };