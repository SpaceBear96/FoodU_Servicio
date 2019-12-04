'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      stu_code: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stu_name: {
        type: Sequelize.STRING
      },
      stu_lsname: {
        type: Sequelize.STRING
      },
      stu_type: {
        type: Sequelize.INTEGER
      },
      uni_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'University', // name of Target model
          key: 'uni_code', // key in Target model that we're referencing
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};