const express = require("express")
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const path = require("path")
const app = express()

const PORT = 5000

/* public dosyasını erişilebilir yap */
    app.use('/public', express.static(path.join(__dirname, 'public')))
/* public dosyasını erişilebilir yap */

/* Ayarlar */ 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
/* Ayarlar */ 

/* template engine */
    app.set('view engine','ejs')
    app.set('views',path.join(__dirname,'./views'))
/* template engine */

/* Route ayarları */
    app.use(require('./routes'));
    app.use(require('./routes/instagramRoute'));
/* Route ayarları */

//app.get('/', (req, res) => res.render(path.join(__dirname,'/api/views/index.ejs')))

app.listen(process.env.PORT || PORT)