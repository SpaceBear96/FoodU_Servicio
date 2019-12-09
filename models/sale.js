'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Quantity: DataTypes.INTEGER,
    Code: DataTypes.STRING,
    Price: DataTypes.DECIMAL,
    State: DataTypes.BOOLEAN,    
    Food_ID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'food',
          key: 'ID'
        }
    },
    Users_ID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'ID'
        }
    },
    Places_ID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'place',
          key: 'ID'
        }
    }
  }, {});

  sale.associate = function(models) {
    sale.belongsTo(models.food,{
        foreignKey:'Food_ID',
        targetKey:'ID'
    }),
    sale.belongsTo(models.place,{
      foreignKey:'Places_ID',
      targetKey:'ID'
    }),
    sale.belongsTo(models.user,{
      foreignKey:'Users_ID',
      targetKey:'ID'
    
    });
  };

  return sale;
};