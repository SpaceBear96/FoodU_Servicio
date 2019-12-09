'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Name: DataTypes.STRING,
    Description: DataTypes.STRING
 }, {});

  return place;
};