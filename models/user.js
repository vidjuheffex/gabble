'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        'User',
        {
            username: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            bio: {
                type: DataTypes.TEXT
            }
        },{});
    User.associate = function(models){
        User.hasMany(models.Post);
    };
                
    return User;
};
