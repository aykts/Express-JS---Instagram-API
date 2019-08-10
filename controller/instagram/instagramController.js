const path = require("path")
const request = require("request")

const instagramViews = '../../views/instagram/index'
const profileViews = '../../views/instagram/profile'

const instagramObj = {
    clienID:'b5fd553e9d924e109867268d76214ff6',
    redirectUri: 'http://localhost:3000/handleApi',
    secretKey: 'cdf6a7b06a8e4acb802c020f49b29486'
}

exports.deneme = function(req, res){
    res.render(path.join(__dirname,instagramViews))
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
                    
                    console.log(parseBody)
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
    
    const instagramUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4459339253.b5fd553.c61d500ec280453a9e5b2403528af5c0'

    request(instagramUrl, function (error, response, body) {
       
        res.json(body)

        // if (!error && response.statusCode == 200) {
           
        //     const bodyData = JSON.parse(body)
            
        //     return (path.join(__dirname,profileViews), bodyData)

        // }else{

        //     res.redirect('/')

        // }

    })

}