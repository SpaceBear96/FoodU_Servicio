"use strict";
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define(
    "food",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      Price: DataTypes.DECIMAL,
      Stock: DataTypes.INTEGER,
      Image: DataTypes.STRING,
      Users_ID: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "ID"
        }
      }
    },
    {}
  );

  food.associate = function(models) {
    food.belongsTo(models.user, {
      foreignKey: "ID"
    });
  };

  return food;
};
