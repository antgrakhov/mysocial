const express = require('express')
const dotenv = require('dotenv').config().parsed
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')

const app = express()
const PORT = dotenv.PORT || 3000
const sequelize = require('./models')

sequelize.sync().then(() => {
    console.log('DB connection successful')
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('MySocial API');
});

app.use('/login', loginRouter)
app.use('/user', userRouter)

app.use(function(err, req, res, next) {
    const status = err.status || 500

    res.status(status).json({
        message: err.message,
        request_id: err.type || 'error',
        code: status
    })
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});