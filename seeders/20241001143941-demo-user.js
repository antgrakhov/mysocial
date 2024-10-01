'use strict';
const data = require('./data.json')

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('user', data)
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('user', null, {})
    }
}