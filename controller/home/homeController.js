const path = require("path")

exports.index = function(req, res){

    const homeViews = '../../views/index'

    const access_token = req.cookies.access_token;
   
    res.render(path.join(__dirname,homeViews), {
        error_reason:req.query.error_reason,
        error: req.query.error,
        error_description:req.query.error_description,
        access_token:access_token
    })

}