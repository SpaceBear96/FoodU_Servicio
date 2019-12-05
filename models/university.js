'use strict';
module.exports = (sequelize, DataTypes) => {
  const university = sequelize.define('university', {
    UniversityID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    UniversityName: DataTypes.STRING,
    UniversityAbrev: DataTypes.STRING
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