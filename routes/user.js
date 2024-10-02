const express = require('express')
const router = express.Router()
const {
    userRegister,
    getUserById,
    searchByName,
} = require('../controller/user')

router.route('/register').post(userRegister)
router.route('/get/:id').get(getUserById)
router.route('/search').get(searchByName)

module.exports = router