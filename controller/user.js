const {v4} = require('uuid')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config().parsed
const User = require('../models/user')

const userRegister = (req, res) => {
    const token = v4()
    const password = req.body.password
        ? bcrypt.hashSync(req.body.password, +dotenv.SALT_LENGTH)
        : ''

    if (
        !req.body.first_name
        || !req.body.second_name
        || password === ''
    ) {
        return res.status(400).send('Невалидные данные')
    }

    User.create({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        birthdate: req.body.birthdate,
        biography: req.body.biography,
        sex: req.body.sex,
        city: req.body.city,
        password,
        token,
    })
        .then((user) => {
            res.status(200).json({
                user_id: user.id
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err,
                request_id: 'register user',
                code: 500
            })
        })

}

const getUserById = (req, res) => {
    const id = req.params.id

    if (isNaN(+id)) {
        return res.status(400).send('Невалидные данные')
    }

    User.findByPk(id)
        .then((user) => {
            if (!user) {
                return res.status(404).send('Анкета не найдена')
            }

            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: err,
                request_id: 'user id ' + id,
                code: 500
            })
        })
}

module.exports = {
    userRegister,
    getUserById,
}