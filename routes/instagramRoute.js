var router = require('express').Router();
const instagramController = require('../controller/instagram/instagramController')

router.route("/").get(instagramController.deneme);
router.route("/getToken").get(instagramController.getToken);
router.route("/handleApi").get(instagramController.handleApi);
router.route("/getProfil").get(instagramController.getProfil);

module.exports = router