const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
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

// helmet protect
app.use(helmet())

// parse json
app.use(bodyParser.json())

// enable cors request
app.use(cors())

// log requests
app.use(morgan('dev'))

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
    res.send('Rota inexistente!')
})

// start on localhost:3000
app.listen(3000, () => console.log('Running on :3000...'))