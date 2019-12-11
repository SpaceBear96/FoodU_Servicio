'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Name: DataTypes.STRING,
    Description: DataTypes.STRING,
    Universities_ID: {
      type: DataTypes.STRING,
        references: {
          model: "university",
          key: "ID"
        }
    }
 });

  place.associate = function(models) {
    place.belongsTo(models.university, {
      foreignKey: "ID"
    });
  };

  return place;
};