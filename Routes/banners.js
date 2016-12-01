const express = require('express')
const Banner = require('../Models/banner')

var router = express.Router()

router.route('/banners')

    .get((req, res) => {

        Banner.getAll((err, banners) => {

            if (err)
                res.json({ error: 1 })

            res.json(banners)

        })

    })

    .post((req, res) => {

        Banner.set(req.body, (err, banner) => {

            if (err)
                res.json({ inserted: 0 })

            res.json({ inserted: 1, id: banner._id })

        })

    })

router.route('/banners/:bannerId')

    .get((req, res) => {

        Banner.getById(req.params.bannerId, (err, banner) => {

            if (err)
                res.json({ error: 1 })

            res.json(banner)

        })

    })

    .put((req, res) => {

        Banner.setById(req.params.bannerId, req.body, (err, banner) => {

            if (err)
                res.json({ updated: 0 })

            res.json({ updated: 1, id: banner._id })

        })

    })

module.exports = router