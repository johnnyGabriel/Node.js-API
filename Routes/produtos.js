const express = require('express')
const Produto = require('../Models/produto')

var router = express.Router()

router.route('/')

    .get((req, res) => {

        Produto.findAll((err, produtos) => {
            res.json(produtos)
        })

    })

    .post((req, res) => {

        Produto.insert(req.body, (err, produto) => {

            if (err)
                res.json({ inserted: 0 })

            res.json({
                inserted: 1,
                id: produto._id
            })

        })
    })

router.route('/:produtoId')

    .get((req, res) => {

        Produto.findById(req.params.produtoId, (err, produto) => {
            res.json(produto)
        })

    })

    .put((req, res) => {

        Produto.edit(req.params.produtoId, req.body, (err, produto) => {

            if (err)
                res.json({ updated: 0 })

            res.json({
                updated: 1,
                id: produto._id
            })

        })

    })

module.exports = router