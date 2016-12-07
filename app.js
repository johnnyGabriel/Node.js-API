const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose')

// config
const config = require('./config')

// routes handlers
const produtos = require('./Routes/produtos')
const banners = require('./Routes/banners')

mongoose.connect(config.mongodb)

const app = express()

// format json
app.set('json spaces', 2)

// middlewares for all routes
app.use([
    helmet(),
    cors(),
    bodyParser.json(),
    compression(),
    morgan('dev')
])

app.get('/', (req, res) => {
    res.send('Bem vindo !!!')
})

// routes
app.use('/api', [
    produtos,
    banners
])

// fallback
app.use('*', (req, res) => {
    res.sendStatus(400)
})

// start on localhost:3000
app.listen(3000, () => console.log('Running on :3000...'))