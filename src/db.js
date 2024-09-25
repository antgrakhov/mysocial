const mysql = require('mysql')
const dotenv = require('dotenv').config().parsed
const connectionConfig = {
    host: dotenv.DB_HOST,
    user: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME,
}

const connection = mysql.createConnection(connectionConfig)

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
})

module.exports = connection