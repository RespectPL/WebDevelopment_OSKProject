var Participant = require('../models/participant')
var Course = require('../models/course')
require('node-localstorage')
var jwt = require('jsonwebtoken')
const Coursedata = require('../models/coursedata')
var Lecture = require('../models/lecture')
var DrivingLesson = require('../models/drivinglesson')
var InternalExam = require('../models/internalexam')

exports.participant_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.user.login}).then(function(participant) {
        var check_data = false
        if(participant != null) {
            check_data = true
        }
        res.render('participant/index', { login: req.user.login, check_data : check_data })
    }) 
}

exports.participant_adddata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    res.render('participant/adddata', {login: req.user.login})
}

exports.participant_adddata_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    var participant = new Participant({
        user: req.user.login,
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        pesel: req.body.pesel,
        telefon: req.body.telefon,
        pkk: req.body.pkk
    })

    participant.save().then(() => {
        res.redirect('/participants')
    }).catch(err => {
        console.log(err)
        res.render('participant/adddata_fail', { login: req.user.login })
    })
}

exports.participant_checkdata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.user.login }).then(function(participant) {
        res.render('participant/data', { login: req.user.login, item: participant })
    })
}

exports.participant_updatedata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    const id = req.params.id
    Participant.findOne({ _id : id }).then(function(participant) {
        res.render('participant/updatedata', { item: participant, id: id, login: req.user.login })
    })
}

exports.participant_updatedata_post = function(req, res) {
    let participant = {}
    participant.imie = req.body.imie
    participant.nazwisko = req.body.nazwisko
    participant.pesel = req.body.pesel
    participant.telefon = req.body.telefon
    participant.pkk = req.body.pkk

    const id = req.params.id

    Participant.findByIdAndUpdate(id, participant, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('participant/updatedata_fail', { login: req.user.login })
        }
        else {
            res.redirect('/participants/data')
        }
    })
}

exports.participant_courseregister_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    
    Course.find().then(function(courses) {
        res.render('participant/courseregister', {login: req.user.login, courses: courses })
    })
}

exports.participant_courseregister_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.user.login }).then(function(participant) {
        var coursedata = new Coursedata({
            user: req.user.login,
            imie: participant.imie,
            nazwisko: participant.nazwisko,
            kurs: req.body.kurs,
            paid: false,
            completed: false
        })

        coursedata.save().then(() => {
            res.render('participant/courseregister_success', { login: req.user.login })
        }).catch(err => {
            console.log(err)
            res.render('participant/courseregister_fail', { login: req.user.login })
        })
    })
}

exports.participant_checkcourse_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Coursedata.find({ user: req.user.login }).then(function(coursedatas) {
        res.render('participant/checkcourse', {login: req.user.login, items: coursedatas })
    })
}

exports.participant_paycourse_post = function(req, res) {
    id = req.body.id

    Coursedata.findOne({ _id: id }).then(function(coursedata) {
        coursedata.paid = true
        Coursedata.findByIdAndUpdate(id, coursedata, function(err, docs) {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/participants/course/check')
            }
        })
    })
}

exports.participant_checklecture_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Lecture.find({ kursant_login: req.user.login }).then(function(lectures) {
        var zaliczone = 0
        var nadchodzace = 0
        var niezaliczone = 0

        for(l of lectures) {
            if(l.data <= Date.now()) {
                l.completed = true
                if(l.attend) zaliczone += l.iloscgodzin
                else niezaliczone += l.iloscgodzin
            }
            else {
                l.completed = false
                nadchodzace += l.iloscgodzin
            }
        }

        var check = false
        if(niezaliczone > 0) check = true

        res.render('participant/checklecture', {login: req.user.login, items: lectures, zal: zaliczone, nzal: niezaliczone, nadch: nadchodzace, check: check })
    })
}

exports.participant_checkdrivinglesson_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    DrivingLesson.find({ kursant_login: req.user.login }).then(function(drivinglessons) {
        var zaliczone = 0
        var nadchodzace = 0
        var niezaliczone = 0

        for(dl of drivinglessons) {
            if(dl.data <= Date.now()) {
                dl.completed = true
                if(dl.attend) zaliczone += dl.iloscgodzin
                else niezaliczone += dl.iloscgodzin
            }
            else {
                dl.completed = false
                nadchodzace += dl.iloscgodzin
            }
        }

        var check = false
        if(niezaliczone > 0) check = true

        res.render('participant/checkdrivinglesson', {login: req.user.login, items: drivinglessons, zal: zaliczone, nzal: niezaliczone, nadch: nadchodzace, check: check })
    })
}

exports.participant_checkinternalexam_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    InternalExam.find({ kursant_login: req.user.login }).then(function(internalexams) {
        var check_dontpass = false
        var check_soon = false

        for(ie of internalexams) {
            if(ie.data <= Date.now()) {
                ie.completed = true
                if(!ie.attend) check_dontpass = true
            }
            else {
                ie.completed = false
                check_soon = true
            }
        }

        res.render('participant/checkinternalexam', {login: req.user.login, items: internalexams, cdp : check_dontpass, cs : check_soon })
    })
}