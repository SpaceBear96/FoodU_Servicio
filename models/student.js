'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    stu_code:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    stu_name: DataTypes.STRING,
    stu_lsname: DataTypes.STRING,
    stu_type: DataTypes.INTEGER
  }, {});
  student.associate = function(models) {
    // associations can be defined here
  };
  return student;
};