const jwt = require('jsonwebtoken')
require('node-localstorage')
var User = require('../models/user')

const authenticate_logged_participant = (req, res, next) => {
    try {
        const token = localStorage.getItem('token')
        const decode = jwt.verify(token, 'kodSzyfrujacy')

        req.user = decode
        User.findOne({ login: req.user.login }).then(function(user) {
            var rola = user.rola
            if(rola === "kursant" || rola == "administrator") {
                next()
            }
            else {
                res.render('noaccess/noaccess')
            }
        })
    }
    catch(err) {
        res.render('noaccess/noaccess')
    }
}

module.exports = authenticate_logged_participant