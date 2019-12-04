'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    pl_code:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    pl_name: DataTypes.STRING,
    pl_descr: DataTypes.STRING,
    pl_lat: DataTypes.DECIMAL,
    pl_lon: DataTypes.DECIMAL
 }, {});

  return place;
};