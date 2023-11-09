const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.Db_Host,
    user: process.env.Db_User,
    password: process.env.Db_Password,
    database: process.env.Db_Database
});

connection.connect((error)=>{
    if (error){
        console.log("El error de la conexión es:"+ error)
        return;
    }
    console.log("Conexión Exitosa");
});

module.exports = connection;