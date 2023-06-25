const dbConfiguration = {
    host : process.env.HOST,
    password : process.env.PASSWORD,
    userName : process.env.USER,
    dialect : process.env.DIALECT,
    databaseName : process.env.DB
}

module.exports =  dbConfiguration;