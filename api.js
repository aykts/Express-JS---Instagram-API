const express = require("express")
const path = require("path")
const app = express()
const controllerSet = require('./api/routes/index/index')

const PORT = 3000

/* public dosyasını erişilebilir yap */
    app.use('/public', express.static(path.join(__dirname, 'public')))
/* public dosyasını erişilebilir yap */

/* template engine */
    app.set('view engine','ejs')
    app.set('views',path.join(__dirname,'./api/views'))
/* template engine */

/* Route ayarları */
    app.use(controllerSet)
/* Route ayarları */

//app.get('/', (req, res) => res.render(path.join(__dirname,'/api/views/index.ejs')))

app.listen(PORT)