const database = require('./index');
const {DataTypes} = require('sequelize');

const user_role = database.define('user_role' , {
    u_role_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    u_role_name : {
        type : DataTypes.STRING,
    }
},{
    paranoid : true,
    tableName : 'user_role',
    deletedAt : 'DeletedAtRole'
})


module.exports = user_role;

