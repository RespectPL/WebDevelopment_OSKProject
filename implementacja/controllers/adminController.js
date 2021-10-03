require('node-localstorage')
var jwt = require('jsonwebtoken')

exports.admin_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    res.render('admin/index', { login: req.user.login })
}