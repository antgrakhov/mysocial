'use strict'

const Sequelize = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
  }
};