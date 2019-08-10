var router = require('express').Router()

const homeRoutes = require('./homeRoute');
const instagramRoutes = require('./instagramRoute');

router.use('/', homeRoutes)
router.use('/instagram', instagramRoutes)

module.exports = router