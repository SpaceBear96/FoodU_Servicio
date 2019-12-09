'use strict';
module.exports = (sequelize, DataTypes) => {
  const rol = sequelize.define('rol', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Name: DataTypes.STRING
    }, {
    freezeTableName: true,
    timestamp: false,
    omitNull:true,
  });

  return rol;
};