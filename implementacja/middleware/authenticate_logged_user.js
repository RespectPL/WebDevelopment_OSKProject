const jwt = require('jsonwebtoken')
require('node-localstorage')

const authenticate_logged_user = (req, res, next) => {
    try {
        const token = localStorage.getItem('token')
        const decode = jwt.verify(token, 'kodSzyfrujacy')

        req.user = decode
        
        next()
    }
    catch(err) {
        res.render('noaccess/noaccess_user')
    }
}

module.exports = authenticate_logged_user