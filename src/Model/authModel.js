const database = require("./index");
const {DataTypes} = require("sequelize");
const user_role = require('./userRoleModel');
const {hash} = require('../Helpers/hashPassword');
const {ConvertToLowerCase} = require('../Helpers/stringMethods');
const {accessToken , refreshToken} = require('./Token')
const UserAuth = database.define("User_Auth" , {
    User_id : {
        type : DataTypes.STRING,
        primaryKey : true,
    },
    User_name : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        set(val){
            this.setDataValue('User_name' , ConvertToLowerCase(val))
        }
    },
    User_password : {
        type : DataTypes.STRING,
        allowNull : false,
        set(val){
            this.setDataValue('User_password', hash(val))
        },
    },
    User_email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    roleId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 3
    },
    User_OTP : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    //user status 0 represents active User 1 represent Deleted User
    User_status : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }
},{
    paranoid : true,
    deletedAt : "deletedData"
})

//Associations
user_role.hasOne(UserAuth,{
    foreignKey : 'roleId',
});
UserAuth.belongsTo(user_role , {
    foreignKey : 'roleId'
});

UserAuth.hasOne(accessToken , {
    foreignKey : "user_id"
})
accessToken.belongsTo(UserAuth , {
    foreignKey : "user_id"
})
UserAuth.hasOne(refreshToken , {
    foreignKey : "user_id"
})
refreshToken.belongsTo(UserAuth , {
    foreignKey : "user_id"
})
module.exports = UserAuth;