const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    second_name: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE
    },
    sex: {
        type: Sequelize.STRING
    },
    biography: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false
})