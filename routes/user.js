const express = require('express')
const router = express.Router()
const {userRegister, getUserById} = require('../controller/user')

router.route('/register').post(userRegister)
router.route('/get/:id').get(getUserById)

module.exports = router