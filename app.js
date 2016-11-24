const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
const produtos = require('./Routes/produtos')

mongoose.connect(config.mongodb)

const app = express()

// format json
app.set('json spaces', 2)

// parse json
app.use(bodyParser.json())

// log requests
app.use(morgan('dev'))

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', (req, res) => {
    res.send('Bem vindo !!!')
})

app.use('/produtos', produtos)

// fallback
app.use('*', (req, res) => {
    res.send('Rota inexistente!')
})

// start on localhost:3000
app.listen(3000, () => console.log('Running on :3000...'))