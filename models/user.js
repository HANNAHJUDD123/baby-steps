
// var Sequelize      = require('sequelize');
// var sequelize = new Sequelize('db', 'admin', 'pwd', {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql'
// });



module.exports = function(sequelize, DataTypes) {
    
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        username: {
            type: DataTypes.STRING
        },

        about: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue: 'active'
        }
    });

    User.associate = function(models) {
        // Associating Event with Posts
        // When an Event is deleted, also delete any associated Posts
        User.hasMany(models.Child, {
            onDelete: "cascade"
        });
        // User.hasMany(models.Event, {
        //     onDelete: "cascade"
        // });
    };

    return User;
};   
