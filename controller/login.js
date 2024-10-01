const bcrypt = require('bcryptjs')
const User = require('../models/user')

const login = (req, res) => {
    if (
        !req.body.id
        || isNaN(+req.body.id)
        || !req.body.password
    ) {
        return res.status(400).send('Невалидные данные')
    }

    User.findOne({
        attributes: ['password', 'token'],
        where: {
            id: req.body.id
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send('Пользователь не найден')
            }

            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    token: user.token
                })
            } else {
                res.status(401).send('В авторизации отказано')
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
                request_id: 'login',
                code: 500
            })
        })
}

module.exports = {
    login,
}