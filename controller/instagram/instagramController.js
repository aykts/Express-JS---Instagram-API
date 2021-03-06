const path = require("path")
const request = require("request")

const instagramObj = {
    clienID:'xxxx',
    redirectUri: 'https://quiet-cove-67229.herokuapp.com/handleApi',
    secretKey: 'xxxx',
    access_token: ''
}

exports.getToken = function(req, res){
    
    const url =  `https://www.instagram.com/oauth/authorize/?client_id=${instagramObj.clienID}&redirect_uri=${instagramObj.redirectUri}&response_type=code`

    res.redirect(url)
 
}

exports.handleApi = function(req, res){

    let error_reason = ''
    let error = ''
    let error_description = ''

        if(typeof req.query.error_reason != 'undefined')
            error_reason = req.query.error_reason

        if(typeof req.query.error != 'undefined')
            error = req.query.error

        if(typeof req.query.error_description != 'undefined')
            error_description = req.query.error_description


    const url = require('url'); 
    
    if(error != ''){
    
        res.redirect(url.format({
            pathname:"/",
            query: {
                error_reason:error_reason,
                error: error,
                error_description:error_description
             }
        }));

    }else{

        let cookie = req.cookies.access_token;

        if (cookie === undefined)
        {
         
            request.post(
                { form: { client_id: instagramObj.clienID,
                          client_secret: instagramObj.secretKey,
                          grant_type: 'authorization_code',
                          redirect_uri: instagramObj.redirectUri,
                          code: req.query.code
                        },
                  url: 'https://api.instagram.com/oauth/access_token'
                },
                function (err, response, body) {
                  if (err) {

                    console.log("error in Post", err)

                  }else{

                    const parseBody = JSON.parse(body)
                    
                    res.cookie('access_token',parseBody.access_token, { maxAge: 900000, httpOnly: true });
                    res.redirect("/");

                  }
                }
            )

        }
        else
        {

            res.redirect(url.format({
                pathname:"/",
                query: {
                    error_description:'Hesabınız daha önceden bağlanmış durumda!'
                 }
            }));
            
        } 

    }
}

exports.getProfil = function(req, res){
    
    const instagramUrl = `https://api.instagram.com/v1/users/self/?access_token=${instagramObj.access_token}`
    //const mediaUrl = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instagramObj.access_token}`

    request(instagramUrl, function (error, response, body) {
       
        res.setHeader('Content-Type', 'application/json');

        if (!error && response.statusCode == 200) {
            
            res.end(body);

        }else{

            res.end(error)

        }

    })

}