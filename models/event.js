
// var Sequelize      = require('sequelize');
// var sequelize = new Sequelize('db', 'admin', 'pwd', {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql'
// });




module.exports = function(sequelize, DataTypes) {
    
    var Event = sequelize.define('Event', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title:{
        	type: DataTypes.STRING
        

        },
        imageurl:{
        	type: DataTypes.STRING
        

        },
        description:{
        	type: DataTypes.STRING
        

        },
        story:{
        	type: DataTypes.STRING
        

        },
        date:{
        	type: DataTypes.DATE
        

        }
        


    });
    

    Event.associate = function(models) {
    // We're saying that a child should belong to an Event
    // A child can't be created without an Event due to the foreign key constraint
    Event.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false
      }
    });
    // Event.belongsTo(models.user, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    // Event.belongsTo(models.user, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //     });


  };

    

    return Event;
};   
