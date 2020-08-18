const express = require('express')

const home = express.Router()

home.get('/', (req, res) => {
    res.render('home/default')
})

module.exports = home