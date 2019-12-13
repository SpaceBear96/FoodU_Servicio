'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    User_ID: {
      type: DataTypes.STRING,
        references: {
          model: "user",
          key: "ID"
        }
    },
    Fav_ID: {
      type: DataTypes.STRING,
        references: {
          model: "user",
          key: "ID"
        }
    }
 });

  favorite.associate = function(models) {
    favorite.belongsTo(models.user, {
      foreignKey:'Fav_ID',
      targetKey:'ID'
    }),
    favorite.belongsTo(models.user, {
      foreignKey:'User_ID',
      targetKey:'ID'
    });
  };

  return favorite;
};