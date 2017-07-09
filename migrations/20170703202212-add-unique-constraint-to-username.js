'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addConstraint('Users', ['username'], {
          type: 'unique',
          name: 'unique_username'
      });
  },
  down: function (queryInterface, Sequelize) {
      queryInterface.removeConstraint('Users', 'unique_username');
  }
};
