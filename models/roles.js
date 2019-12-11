'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamp: false,
    omitNull: true,
  }, {});
  roles.associate = function (models) {
    roles.hasMany(models.user, {
      foreignKey: 'ID'
    });
  };
  return roles;
};