'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    OrderID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    OrderCant: DataTypes.INTEGER,
    OrderPin: DataTypes.STRING,
    OrderTotal: DataTypes.DECIMAL,
    OrderState: DataTypes.BOOLEAN,    
    PostID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'PostID'
        }
    },
    StudentID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'student',
          key: 'StudentID'
        }
    },
    PlaceID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'place',
          key: 'PlaceID'
        }
    }
  }, {});

  order.associate = function(models) {
    order.belongsTo(models.post,{
        foreignKey:'PostID'
    }),
    order.belongsTo(models.place,{
      foreignKey:'PlaceID'
    }),
    order.belongsTo(models.student,{
      foreignKey:'StudentID'
    })
  };

  return order;
};