var Instructor = require('../models/instructor')
var Coursedata = require('../models/coursedata')
var Lecture = require('../models/lecture')
var Participant = require('../models/participant')
var DrivingLesson  = require('../models/drivinglesson')
var Course = require('../models/course')
var Vehicle = require('../models/vehicle')
var InternalExam = require('../models/internalexam')
require('node-localstorage')
var jwt = require('jsonwebtoken')

exports.instructor_list = function(req, res) {
    Instructor.find().then(function(instructors) {
        res.render('instructor/instructor_list', { items: instructors })
    })
}

exports.instructor_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Instructor.findOne({ user: req.user.login}).then(function(instructor) {
        var check_data = false
        if(instructor != null) {
            check_data = true
        }
        res.render('instructor/index', { login: req.user.login, check_data : check_data })
    })
}

exports.instructor_adddata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    res.render('instructor/adddata', {login: req.user.login})
}

exports.instructor_adddata_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    var instructor = new Instructor({
        user: req.user.login,
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        telefon: req.body.telefon
    })

    instructor.save().then(() => {
        res.redirect('/instructors')
    }).catch(err => {
        console.log(err)
        res.render('instructor/adddata_fail', { login: req.user.login })
    })
}

exports.instructor_checkdata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Instructor.findOne({ user: req.user.login }).then(function(instructor) {
        res.render('instructor/data', { login: req.user.login, item: instructor })
    })
}

exports.instructor_updatedata_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    const id = req.params.id
    Instructor.findOne({ _id : id }).then(function(instructor) {
        res.render('instructor/updatedata', { item: instructor, id: id, login: req.user.login })
    })
}

exports.instructor_updatedata_post = function(req, res) {
    let instructor = {}
    instructor.imie = req.body.imie
    instructor.nazwisko = req.body.nazwisko
    instructor.telefon = req.body.telefon

    const id = req.params.id

    Instructor.findByIdAndUpdate(id, instructor, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('instructor/updatedata_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/data')
        }
    })
}

exports.instructor_checkcourse_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Coursedata.find().then(function(coursedatas) {
        res.render('instructor/checkcourse', { login: req.user.login, items: coursedatas })
    })
}

exports.instructor_endcourse_post = function(req, res) {
    id = req.body.id

    Coursedata.findOne({ _id: id }).then(function(coursedata) {
        coursedata.completed = true
        Coursedata.findByIdAndUpdate(id, coursedata, function(err, docs) {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/instructors/course/check')
            }
        })
    })
}

exports.instructor_lectureindex_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Lecture.find({ instruktor_login : req.user.login }).then(function(lectures) {
        res.render('instructor/lectureindex', { login: req.user.login, items: lectures })
    })
}

exports.instructor_lectureadd_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.find().then(function(participants) {
        res.render('instructor/lectureadd', { login: req.user.login, participants: participants })
    })
}

exports.instructor_lectureadd_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.body.kursant }).then(function(participant) {
        Instructor.findOne({ user: req.user.login}).then(function(instructor) {
            var lecture = new Lecture({
                instruktor_login: req.user.login,
                instruktor_imie: instructor.imie,
                instruktor_nazwisko: instructor.nazwisko,
                kursant_login: req.body.kursant,
                kursant_imie: participant.imie,
                kursant_nazwisko: participant.nazwisko,
                temat: req.body.temat,
                data: req.body.data,
                iloscgodzin: req.body.iloscgodzin,
                attend: false
            })
        
            lecture.save().then(() => {
                res.redirect('/instructors/lecture')
            }).catch(err => {
                console.log(err)
                res.render('instructor/lectureadd_fail', { login: req.user.login })
            })
        })
    })
}

exports.instructor_lecturedelete_post = function(req, res) {
    id = req.body.id

    Lecture.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('instructor/lecturedelete_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/lecture')
        }
    })
}

exports.instructor_lectureupdate_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    const id = req.params.id
    Lecture.findOne({ _id : id }).then(function(lecture) {
        res.render('instructor/lectureupdate', { item: lecture, id: id, login: req.user.login })
    })
}

exports.instructor_lectureupdate_post = function(req, res) {
    let lecture = {}
    lecture.data = req.body.data
    lecture.temat = req.body.temat
    lecture.iloscgodzin = req.body.iloscgodzin

    const id = req.params.id

    Lecture.findByIdAndUpdate(id, lecture, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('instructor/lectureupdate_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/lecture')
        }
    })
}

exports.instructor_completelecture_post = function(req, res) {
    id = req.body.id

    Lecture.findOne({ _id: id }).then(function(lecture) {
        lecture.attend = true
        Lecture.findByIdAndUpdate(id, lecture, function(err, docs) {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/instructors/lecture')
            }
        })
    })
}

exports.instructor_drivinglessonindex_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    DrivingLesson.find({ instruktor_login : req.user.login }).then(function(drivinglessons) {
        res.render('instructor/drivinglessonindex', { login: req.user.login, items: drivinglessons })
    })
}

exports.instructor_drivinglessonadd_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.find().then(function(participants) {
        Course.find().then(function(courses) {
            Vehicle.find().then(function(vehicles) {
                res.render('instructor/drivinglessonadd', { login: req.user.login, participants: participants, courses: courses, vehicles: vehicles })
            })
        })
    })
}

exports.instructor_drivinglessonadd_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.body.kursant }).then(function(participant) {
        Instructor.findOne({ user: req.user.login}).then(function(instructor) {
            Course.findOne({ _id : req.body.kurs }).then(function(course) {
                Vehicle.findOne({ _id : req.body.pojazd }).then(function(vehicle) {
                    var drivinglesson = new DrivingLesson({
                        instruktor_login: req.user.login,
                        instruktor_imie: instructor.imie,
                        instruktor_nazwisko: instructor.nazwisko,
                        kursant_login: req.body.kursant,
                        kursant_imie: participant.imie,
                        kursant_nazwisko: participant.nazwisko,
                        kurs_id: course._id,
                        kurs_info: course.oznaczenie + '/' + course.kategoria,
                        pojazd_id: vehicle._id,
                        pojazd_info: vehicle.nazwa + '/' + vehicle.typ + '/' + vehicle.nrrejestracyjny,
                        data: req.body.data,
                        iloscgodzin: req.body.iloscgodzin,
                        attend: false
                    })
                
                    drivinglesson.save().then(() => {
                        res.redirect('/instructors/drivinglesson')
                    }).catch(err => {
                        console.log(err)
                        res.render('instructor/drivinglessonadd_fail', { login: req.user.login })
                    })
                })
            })
        })
    })
}

exports.instructor_drivinglessonupdate_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    const id = req.params.id
    DrivingLesson.findOne({ _id : id }).then(function(drivinglesson) {
        Vehicle.find().then(function(vehicles) {
            res.render('instructor/drivinglessonupdate', { item: drivinglesson, id: id, login: req.user.login, vehicles: vehicles })   
        })
    })
}

exports.instructor_drivinglessonupdate_post = function(req, res) {
    Vehicle.findOne({_id : req.body.pojazd }).then(function(vehicle) {
        let drivinglesson = {}
        drivinglesson.data = req.body.data
        drivinglesson.iloscgodzin = req.body.iloscgodzin
        drivinglesson.pojazd_id = vehicle._id,
        drivinglesson.pojazd_info = vehicle.nazwa + "/" + vehicle.typ + "/" + vehicle.nrrejestracyjny

        const id = req.params.id

        DrivingLesson.findByIdAndUpdate(id, drivinglesson, function(err, docs) {
            if(err) {
                console.log(err)
                res.render('instructor/drivinglessonupdate_fail', { login: req.user.login })
            }
            else {
                res.redirect('/instructors/drivinglesson')
            }
        })
    })
}

exports.instructor_completedrivinglesson_post = function(req, res) {
    id = req.body.id

    DrivingLesson.findOne({ _id: id }).then(function(drivinglesson) {
        drivinglesson.attend = true
        DrivingLesson.findByIdAndUpdate(id, drivinglesson, function(err, docs) {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/instructors/drivinglesson')
            }
        })
    })
}

exports.instructor_drivinglessondelete_post = function(req, res) {
    id = req.body.id

    DrivingLesson.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('instructor/drivinglessondelete_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/drivinglesson')
        }
    })
}

exports.instructor_internalexamindex_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    InternalExam.find({ instruktor_login : req.user.login }).then(function(internalexams) {
        res.render('instructor/internalexamindex', { login: req.user.login, items: internalexams })
    })
}

exports.instructor_internalexamadd_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.find().then(function(participants) {
        Course.find().then(function(courses) {
            res.render('instructor/internalexamadd', { login: req.user.login, participants: participants, courses: courses })
        })
    })
}

exports.instructor_internalexamadd_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    Participant.findOne({ user: req.body.kursant }).then(function(participant) {
        Instructor.findOne({ user: req.user.login }).then(function(instructor) {
            Course.findOne({ _id : req.body.kurs }).then(function(course) {
                var internalexam = new InternalExam({
                    instruktor_login: req.user.login,
                    instruktor_imie: instructor.imie,
                    instruktor_nazwisko: instructor.nazwisko,
                    kursant_login: req.body.kursant,
                    kursant_imie: participant.imie,
                    kursant_nazwisko: participant.nazwisko,
                    kurs_id: course._id,
                    kurs_info: course.oznaczenie + '/' + course.kategoria,
                    data: req.body.data,
                    pass: false
                })
            
                internalexam.save().then(() => {
                    res.redirect('/instructors/internalexam')
                }).catch(err => {
                    console.log(err)
                    res.render('instructor/internalexamadd_fail', { login: req.user.login })
                })
            })
        })
    })
}

exports.instructor_internalexamupdate_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    const id = req.params.id
    InternalExam.findOne({ _id : id }).then(function(internalexam) {
        res.render('instructor/internalexamupdate', { item: internalexam, id: id, login: req.user.login })
    })
}

exports.instructor_internalexamupdate_post = function(req, res) {
    let internalexam = {}
    internalexam.data = req.body.data

    const id = req.params.id

    InternalExam.findByIdAndUpdate(id, internalexam, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('instructor/internalexamupdate_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/internalexam')
        }
    })
}

exports.instructor_internalexamdelete_post = function(req, res) {
    id = req.body.id

    InternalExam.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('instructor/internalexamdelete_fail', { login: req.user.login })
        }
        else {
            res.redirect('/instructors/internalexam')
        }
    })
}

exports.instructor_completeinternalexam_post = function(req, res) {
    id = req.body.id

    InternalExam.findOne({ _id: id }).then(function(internalexam) {
        internalexam.pass = true
        InternalExam.findByIdAndUpdate(id, internalexam, function(err, docs) {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/instructors/internalexam')
            }
        })
    })
}