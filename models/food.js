"use strict";
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define(
    "food",
    {
      FoodID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      FoodName: DataTypes.STRING,
      FoodDescr: DataTypes.STRING,
      FoodPrecio: DataTypes.DECIMAL,
      FoodStock: DataTypes.INTEGER,
      FoodImg: DataTypes.STRING,
      StudentID: {
        type: DataTypes.INTEGER,
        references: {
          model: "student",
          key: "StudentID"
        }
      }
    },
    {}
  );

  food.associate = function(models) {
    food.belongsTo(models.student, {
      foreignKey: "StudentID"
    });
  };

  return food;
};
