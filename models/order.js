'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    or_code:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    or_cant: DataTypes.INTEGER,
    or_total: DataTypes.DECIMAL,
    or_state: DataTypes.BOOLEAN,    
    pst_code:{
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'pst_code'
        }
    },
    stu_code:{
        type: DataTypes.INTEGER,
        references: {
          model: 'student',
          key: 'stu_code'
        }
    },
    pl_code:{
        type: DataTypes.INTEGER,
        references: {
          model: 'place',
          key: 'pl_code'
        }
    }
  }, {});

  order.associate = function(models) {
    order.belongsTo(models.post,{
        foreignKey:'pstd_code'
    }),
    order.belongsTo(models.place,{
      foreignKey:'pl_code'
    }),
    order.belongsTo(models.student,{
      foreignKey:'stu_code'
    })
  };

  return order;
};