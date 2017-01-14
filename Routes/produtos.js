const express = require('express')
const _ = require('underscore')
const Produto = require('../Models/produto')

var router = express.Router()

router.route('/produtos')

    .get((req, res) => {

        const success = (data) => { res.json(data) }
        const fail = (err) => { res.status(500).send(err) }

        ( req.query.search ?
            Produto.search(
                    req.query.search,
                    _.pick( req.query, 'ativo' ),
                    success,
                    fail
                ) :
            Produto.getAll( req.query, success, fail ) )


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

// router.route('/produtos/search/:searchString')
    
//     .get( (req, res) => {

//         Produto.search( req.params.searchString, (data) => {

//             res.json(data)

//         }, (err) => {

//             res.status(500).send(err)

//         })

//     })

router.route('/produtos/:produtoId')

    .get((req, res) => {

        res.sendStatus(501)

    })

    .put((req, res) => {

        res.sendStatus(501)

    })

module.exports = router