require('node-localstorage')
var jwt = require('jsonwebtoken')
var Opinion = require('../models/opinion')

exports.index = function(req, res) {
    Opinion.find().then(function(opinions) {
        res.render('opinion/index', { opcom : opinions })
    })
}

exports.addopinion = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    const opinion = new Opinion(
        {
            user: req.user.login,
            tresc: req.body.tresc
        }
    )

    opinion.save().then(() => {
        res.redirect('/opinions')
    }).catch(err => {
        console.log(err)
    })
}