var User = require('../models/user')
var Participant = require('../models/participant')
var Instructor = require('../models/instructor')

require('node-localstorage')
var hbs = require('handlebars')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.admin_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    hbs.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });

    User.find().then(function(users) {
        res.render('user/admin_index', { login: req.user.login, items: users })
    })
}

exports.admin_userdelete_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    id = req.body.id
    User.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('vehicle/admin_vehicledelete_fail', { login: req.user.login })
        }
        else {
            if(docs.rola === "instruktor") {
                Instructor.findOneAndDelete({user: docs.login}, function(err, docs2) {
                    if(err) {
                        console.log(err)
                        res.render('user/admin_userdelete_fail', { login: req.user.login })
                    }
                    else {
                        res.redirect('/users/admin')
                    }
                })
            }
            else if(docs.rola === "kursant") {
                Participant.findOneAndDelete({user: docs.login}, function(err, docs2) {
                    if(err) {
                        console.log(err)
                        res.render('user/admin_userdelete_fail', { login: req.user.login })
                    }
                    else {
                        res.redirect('/users/admin')
                    }
                })
            }
            
        }
    })
}

exports.register_get = function(req, res) {
    res.render('user/register')
}

exports.register_post = (req, res, next) => {
    bcrypt.hash(req.body.haslo, 10, function(err, PasswordHash) {
        if(err) {
            res.json({
                error: 'blad funkcji haszujacej'
            })
        }

        let user = new User({
            login: req.body.login,
            haslo: PasswordHash,
            email: req.body.email,
            rola: req.body.rola
        })

        user.save().then(() => {
            res.render('user/register_success', { item: req.body })
        }).catch(() => {
            res.render('user/register_fail')
        })
    })
}

exports.login_get = function(req, res) {
    res.render('user/login')
}

exports.login_post = (req, res, next) => {
    var login = req.body.login
    var haslo = req.body.haslo

    User.findOne({login}).then(user => {
        if(user) {
            bcrypt.compare(haslo, user.haslo, function(err, result) {
                if(err) {
                    res.json({ error : err})
                }
                if(result) {
                    let token = jwt.sign({ login: user.login }, 'kodSzyfrujacy', { expiresIn: '1h' })
                    res.redirect('/')
                    
                    if(typeof localStorage === "undefined" || localStorage === null) {
                        var LocalStorage = require('node-localstorage').LocalStorage
                        localStorage = new LocalStorage('./scratch')
                    }
                    localStorage.setItem('token', token)
                    //console.log(localStorage.getItem('token'))
                }
                else {
                    res.render('user/login_wrong_pass')
                }
            })
        }
        else {
            res.render('user/login_fail')
        }
    })
}

exports.logout = function(req, res) {
    localStorage.clear()
    res.redirect('/')
}