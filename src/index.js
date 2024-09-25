const express = require('express')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('MySocial API');
});

app.use(express.json())

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