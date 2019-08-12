const path = require("path")
const request = require("request")

exports.index = function(req, res){

    const homeViews = '../../views/index'
    const access_token = req.cookies.access_token;
    const params = ''

    if( access_token != ''){

        const instagramUrl = `https://api.instagram.com/v1/users/self/?access_token=${access_token}`
        //const mediaUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4459339253.b5fd553.c61d500ec280453a9e5b2403528af5c0'
        
        const title = "İnstagram Uygulaması"

        request(instagramUrl, function (error, response, body) {
        
            if (!error && response.statusCode == 200) {
                
                const parseData = JSON.parse(body)

                res.render(path.join(__dirname,homeViews), {
                    error_reason:req.query.error_reason,
                    error: req.query.error,
                    error_description:req.query.error_description,
                    access_token:access_token,
                    json_data:parseData,
                    title: "@" + parseData.data.username + " - " + title,
                    selectedMenu: params
                })

            }else{

                res.render(path.join(__dirname,homeViews), {
                    error_reason:req.query.error_reason,
                    error: req.query.error,
                    error_description:req.query.error_description,
                    access_token:access_token,
                    json_data:error,
                    title: title,
                    selectedMenu: params
                })

            }

        })

    }else{

        res.render(path.join(__dirname,homeViews), {
            error_reason:req.query.error_reason,
            error: req.query.error,
            error_description:req.query.error_description,
            access_token:access_token,
            title: "Giriş yap",
            selectedMenu: params
        })

    }

}

exports.getDetail = function(req, res){

    const detailViews = '../../views/detail'
    const params = req.params.param
    const access_token = req.cookies.access_token;
   
    if( access_token != ''){

        const instagramUrl = `https://api.instagram.com/v1/users/self/?access_token=${access_token}`
        
        const title = "İnstagram Uygulaması"

        request(instagramUrl, function (error, response, body) {
        
            if (!error && response.statusCode == 200) {
                
                const parseData = JSON.parse(body)

                res.render(path.join(__dirname,detailViews), {
                    error_reason:req.query.error_reason,
                    error: req.query.error,
                    error_description:req.query.error_description,
                    access_token:access_token,
                    json_data:parseData,
                    title: "@" + parseData.data.username + " - " + title,
                    selectedMenu: params
                })

            }else{

                res.redirect("/")

            }

        })

    }else{

        res.redirect("/")

    }

}

exports.getTag = function(req, res){

    const params = req.query.tag
    const access_token = req.cookies.access_token;
    const mediaUrl = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`
    var _ = require('lodash');

    request(mediaUrl, function (error, response, body) {
        
        res.setHeader('Content-Type', 'application/json');
        if (!error && response.statusCode == 200) {
            
            const groupData = JSON.parse(body)
            const sortData = _.orderBy(groupData, 'data.likes.count', 'asc');
            
            res.end(JSON.stringify(sortData))

        }else{

            res.end({ "status": false })

        }

    })

}

exports.logOut = function(req,res){

    res.clearCookie("access_token");
    res.cookie('access_token','', { maxAge: -900, httpOnly: true });
    res.redirect('/')

}