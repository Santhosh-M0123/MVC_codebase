const database = require('./index');
const {DataTypes} = require("sequelize");

const accessToken = database.define("u_access_token" , {
    user_id : {
        type : DataTypes.STRING,
        unique : true
    },
    token : {
        type : DataTypes.STRING(600),
        unique : true
    }
},{
    tableName : 'u_access_token'
});


const refreshToken = database.define("u_refresh_token" , {
    user_id : {
        type : DataTypes.STRING,
        unique : true
    },
    refresh_token : {
        type : DataTypes.STRING(600),
        unique : true,
    }
},{
    tableName : 'u_refresh_token'
})


module.exports = {accessToken,refreshToken};