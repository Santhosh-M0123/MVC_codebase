const database = require("./index");
const {DataTypes} = require("sequelize");

const User_data = database.define('U_data' , {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true
    },
    course_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    Staff_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    course_description : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    paranoid : true,
    deletedAt : "DataDeleted"
})

module.exports = User_data;