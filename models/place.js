'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    PlaceID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    PlaceName: DataTypes.STRING,
    PlaceDescr: DataTypes.STRING,
    PlaceLat: DataTypes.DECIMAL,
    PlaceLon: DataTypes.DECIMAL
 }, {});

  return place;
};