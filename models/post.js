'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
 body: {
          type: DataTypes.TEXT,
          allowNull: false
      }
  },{
      
  });


    Post.associate = function(models) {
        Post.belongsTo(models.User, {as: 'author', foreignKey: 'authorid'});
        Post.hasMany(models.Like, {
            as: 'Likes',
            foreignKey: {
                name: 'postid'
            },
            onDelete: 'cascade',
            hooks: 'true'
        });
    };
    
  return Post;
};
//
