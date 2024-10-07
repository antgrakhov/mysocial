const {v4} = require('uuid')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config().parsed
const {Op} = require('sequelize')
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

    User.findByPk(id, {
        attributes: {
            exclude: ['password', 'token'],
        },
    })
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

const searchByName = (req, res) => {
    const firstName = req.query.first_name
    const secondName = req.query.second_name

    const emptyQueries = !firstName && !secondName
    const shortQueries = firstName?.length < 3 || secondName?.length < 3

    if (emptyQueries || shortQueries) {
        return res.status(400).send('Невалидные данные')
    }

    const whereData = {}

    if (firstName) {
        whereData.first_name = { [Op.like]: `${firstName}%` }
    }

    if (secondName) {
        whereData.second_name = { [Op.like]: `${secondName}%` }
    }

    User.findAll({
        attributes: {
            exclude: ['password', 'token']
        },
        where: whereData,
        order: ['id'],
    })
        .then((user) => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: err,
                request_id: 'search',
                code: 500
            })
        })
}

module.exports = {
    userRegister,
    getUserById,
    searchByName,
}