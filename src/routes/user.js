const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {v4} = require('uuid')
const connection = require('../db')
const dotenv = require('dotenv').config().parsed

router.route('/register').post((req, res) => {
    const token = v4()
    const password = req.body.password
        ? bcrypt.hashSync(req.body.password, +dotenv.SALT_LENGTH)
        : ''

    if (
        !req.body.first_name
        || !req.body.second_name
        || password === ''
    ) {
        res.status(400).send('Невалидные данные')
    } else {
        connection.query(
            'INSERT INTO user' +
            ' (first_name, second_name, birthdate, biography, sex, city, password, token)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                req.body?.first_name,
                req.body?.second_name,
                req.body?.birthdate,
                req.body?.biography,
                req.body?.sex,
                req.body?.city,
                password,
                token
            ],
            function (error, results) {
                if (error) {
                    res.status(500).json({
                        'message': 'Query: ' + error,
                        'code': 500
                    })
                } else {
                    res.json({
                        'user_id': results?.insertId
                    })
                }
            }
        )
    }
})

router.route('/get/:id').get((req, res) => {
    const id = req.params.id

    if (!isNaN(+id)) {
        connection.query(
            'SELECT first_name, second_name, birthdate, biography, sex, city FROM user WHERE id = ?',
            [id],
            function (error, results) {
                if (error) {
                    res.status(500).json({
                        'message': 'Query: ' + error,
                        'code': 500
                    })
                } else {
                    if (results.length > 0) {
                        res.json(results[0])
                    } else {
                        res.status(404).send('Анкета не найдена')
                    }
                }
            }
        )
    } else {
        res.status(400).send('Невалидные данные')
    }
})

module.exports = router