const express = require("express")
const path = require("path")

const router = express.Router()

const homeController = require('../../controller/home/homeController')

router.get(['/','/index','/home'], (req, res) => {
    
    res.render(path.join(__dirname,homeController.index()))

})

module.exports = router