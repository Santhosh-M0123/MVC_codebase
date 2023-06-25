const {Sequelize} = require('sequelize');
const dbConfig = require('../Config/dbConfig')

const database = new Sequelize(dbConfig.databaseName, dbConfig.userName, dbConfig.password,{
    host : dbConfig.host,
    dialect : dbConfig.dialect,
    logging : false
})

if(database){
    database.authenticate().then(console.log("Db connected!!"))
}else{
    console.log("Db not connected");
}

module.exports = database;
