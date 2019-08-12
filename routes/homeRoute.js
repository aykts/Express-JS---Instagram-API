const router = require('express').Router();
const homeController = require('../controller/home/homeController')

router.route("/").get(homeController.index);
router.route("/get-detail/:param").get(homeController.getDetail);
router.route("/get-tag").get(homeController.getTag);
router.route("/logout").get(homeController.logOut);

module.exports = router;