require('node-localstorage')
var jwt = require('jsonwebtoken')

const Course = require('../models/course')

exports.course_list = function(req, res) {
    Course.find().then(function(courses) {
        res.render('course/course_list', { items: courses })
    })
}

exports.admin_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Course.find().then(function(courses) {
        res.render('course/admin_index', { login: req.user.login, items: courses })
    })
}

exports.admin_courseadd_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    res.render('course/admin_courseadd')
}

exports.admin_courseadd_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    var course = new Course({
        oznaczenie: req.body.oznaczenie,
        kategoria: req.body.kategoria
    })

    course.save().then(() => {
        res.render('course/admin_courseadd_success', { item: req.body, login: req.user.login })
    }).catch(err => {
        console.log(err)
        res.render('course/admin_courseadd_fail', { login: req.user.login })
    })
}

exports.admin_courseupdate_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    const id = req.params.id
    Course.findOne({ _id : id }).then(function(course) {
        res.render('course/admin_courseupdate', { item: course, id: id, login: req.user.login })
    })
}

exports.admin_courseupdate_post = function(req, res) {
    let course = {}
    course.oznaczenie = req.body.oznaczenie
    course.kategoria = req.body.kategoria

    const id = req.params.id

    Course.findByIdAndUpdate(id, course, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('course/admin_courseupdate_fail', { login: req.user.login })
        }
        else {
            res.redirect('/courses/admin')
        }
    })
}

exports.admin_coursedelete_post = function(req, res) {
    id = req.body.id
    Course.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('course/admin_coursedelete_fail', { login: req.user.login })
        }
        else {
            res.redirect('/courses/admin')
        }
    })
}