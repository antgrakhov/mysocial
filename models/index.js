const {Sequelize} = require('sequelize')
const dotenv = require('dotenv').config().parsed

const sequelize = new Sequelize(
    dotenv.DB_NAME,
    dotenv.DB_USER,
    dotenv.DB_PASSWORD,
    {
        host: dotenv.DB_HOST,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = sequelize