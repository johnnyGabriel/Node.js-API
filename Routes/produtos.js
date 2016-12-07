const express = require('express')
const Produto = require('../Models/produto')

var router = express.Router()

router.route('/produtos')

    .get((req, res) => {

        Produto.getAll( (data) => {

            res.json(data)

        }, (err) => {

            res.status(500).send(err)

        })

    })

    .post((req, res) => {

        Produto.insert(req.body, (data) => {

            res.status(201).json({
                inserted: 1,
                id: data.id
            })

        }, (err) => {
            res.status(422).json({
                error: err
            })
        })

    })

router.route('/produtos/:produtoId')

    .get((req, res) => {

        res.sendStatus(501)

    })

    .put((req, res) => {

        res.sendStatus(501)

    })

module.exports = router