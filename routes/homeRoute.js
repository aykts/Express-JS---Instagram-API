const router = require('express').Router();
const homeController = require('../controller/home/homeController')

router.route("/").get(homeController.index);

module.exports = router;