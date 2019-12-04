"use strict";
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define(
    "food",
    {
      fd_code: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fd_name: DataTypes.STRING,
      fd_descr: DataTypes.STRING,
      fd_precio: DataTypes.DECIMAL,
      fd_stock: DataTypes.INTEGER,
      fd_img: DataTypes.STRING,
      stu_code: {
        type: DataTypes.INTEGER,
        references: {
          model: "student",
          key: "stu_code"
        }
      }
    },
    {}
  );

  food.associate = function(models) {
    food.belongsTo(models.student, {
      foreignKey: "stu_code"
    });
  };

  return food;
};
