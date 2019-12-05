'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    PostID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    PostTitle: DataTypes.STRING,
    PostDescr: DataTypes.STRING,
    FoodID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'food',
          key: 'FoodID'
        }
    }
  }, {}); 

  post.associate = function(models) {
    post.belongsTo(models.food,{
        foreignKey:'FoodID'
    })
  };

  return post;
};