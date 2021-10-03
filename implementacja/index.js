const bodyParser = require('body-parser')
const express = require('express')
require('node-localstorage')
var jwt = require('jsonwebtoken')

var User = require('./models/user')

const port = 8000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//database
const db = require('./db/database.js')

//routes
const usersRoutes = require('./routes/user.js')
const participantsRoutes = require('./routes/participant.js')
const instructorsRoutes = require('./routes/instructor.js')
const adminRoutes = require('./routes/admin.js')
const vehiclesRoutes = require('./routes/vehicle.js')
const coursesRoutes = require('./routes/course.js')
const opinionRoutes = require('./routes/opinion.js')

//Wywolanie strony glownej
app.get('/', (req, res) => {
    if(typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage
        localStorage = new LocalStorage('./scratch')
    }
    const token = localStorage.getItem('token')
    if(token != null) {
        const decode = jwt.verify(token, 'kodSzyfrujacy')
        req.user = decode
        User.findOne({ login: req.user.login }).then(function(user) {
            var rola = user.rola
            if(rola === "instruktor") {
                res.render('index/index', {title: 'System Obsługi Ośrodka Szkolenia Kierowców (OSK) - Strona Główna', login: req.user.login, instruktor: true })  
            }
            else if(rola === "kursant") {
                res.render('index/index', {title: 'System Obsługi Ośrodka Szkolenia Kierowców (OSK) - Strona Główna', login: req.user.login })  
            }
            else if(rola === "administrator") {
                res.render('index/index', {title: 'System Obsługi Ośrodka Szkolenia Kierowców (OSK) - Strona Główna', login: req.user.login, admin: true })
            }
        })
    }
    else {
        res.render('index/index', {title: 'System Obsługi Ośrodka Szkolenia Kierowców (OSK) - Strona Główna'})
    }
})

//sciezki do podstron
app.use('/users', usersRoutes)
app.use('/participants', participantsRoutes)
app.use('/instructors', instructorsRoutes)
app.use('/admin', adminRoutes)
app.use('/vehicles', vehiclesRoutes)
app.use('/courses', coursesRoutes)
app.use('/opinions', opinionRoutes)

//hbs1
const hbs = require('express-handlebars')
var path = require('path')

app.use(express.static(path.join(__dirname, '/public')))

//hbs2
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/', 
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMehotdsByDefault: true
}}))
app.set('view engine', 'hbs')

app.listen(port)