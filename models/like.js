'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {

  }, {

  });

    Like.associate = function(models){
        Like.belongsTo(models.User, {as: 'user', foreignKey: 'userid'});
        Like.belongsTo(models.Post, {as: 'post', foreignKey: 'postid'});
    };
    
  return Like;
};
