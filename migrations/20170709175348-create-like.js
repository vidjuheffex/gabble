'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              key: 'id',
              model: 'Users'
          }
      },
      postid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
              key: 'id',
              model: 'Posts'
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Likes');
  }
};
