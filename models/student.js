'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    StudentID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    StudentName: DataTypes.STRING,
    StudentLsname: DataTypes.STRING,
    StudentType: DataTypes.INTEGER
  }, {});
  student.associate = function(models) {
    // associations can be defined here
  };
  return student;
};