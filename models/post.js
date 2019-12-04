'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    pst_code:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    pst_title: DataTypes.STRING,
    pst_descr: DataTypes.STRING,
    fd_code:{
        type: DataTypes.INTEGER,
        references: {
          model: 'food',
          key: 'fd_code'
        }
    }
  }, {});
 
 

  post.associate = function(models) {
    post.belongsTo(models.food,{
        foreignKey:'fd_code'
    })
  };

  return post;
};