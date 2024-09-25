const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connection = require('../db')

router.route('/').post((req, res) => {
    if (!req.body.id || !req.body.password) {
        res.status(400).send('Невалидные данные')
    } else {
        const id = !isNaN(+req.body.id)
            ? req.body.id
            : 0

        connection.query(
            'SELECT password, token FROM user WHERE id = ?',
            [id],
            function (error, results){
                if (error) {
                    res.status(500).json({
                        'message': 'Query: ' + error,
                        'code': 500,
                    })
                } else {
                    if (results.length > 0) {
                        const {
                            password,
                            token
                        } = results[0]

                        if (bcrypt.compareSync(req.body.password, password)) {
                            res.json({token})
                        } else {
                            res.status(404).send('Пользователь не найден')
                        }
                    } else {
                       res.status(404).send('Пользователь не найден')
                    }
                }
            }
        )
    }
})

module.exports = router