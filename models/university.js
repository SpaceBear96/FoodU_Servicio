'use strict';
module.exports = (sequelize, DataTypes) => {
  const university = sequelize.define('university', {
    uni_code:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    uni_name: DataTypes.STRING,
    uni_abrev: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamp: false,
    omitNull:true,
  });
  university.associate = function(models) {
    // associations can be defined here
  };
  return university;
};