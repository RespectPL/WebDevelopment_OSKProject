require('node-localstorage')
var jwt = require('jsonwebtoken')

const Vehicle = require('../models/vehicle')

exports.vehicle_list = function(req, res) {
    Vehicle.find().then(function(vehicles) {
        res.render('vehicle/vehicle_list', { items: vehicles })
    })
}

exports.admin_index = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    
    Vehicle.find().then(function(vehicles) {
        res.render('vehicle/admin_index', { login: req.user.login, items: vehicles })
    })
}

exports.admin_vehicleadd_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    res.render('vehicle/admin_vehicleadd', { login: req.user.login })
}

exports.admin_vehicleadd_post = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode

    var vehicle = new Vehicle({
        nazwa: req.body.nazwa,
        typ: req.body.typ,
        nrrejestracyjny: req.body.nrrejestracyjny
    })

    vehicle.save().then(() => {
        res.render('vehicle/admin_vehicleadd_success', { item: req.body, login: req.user.login })
    }).catch(err => {
        console.log(err)
        res.render('vehicle/admin_vehicleadd_fail', { login: req.user.login })
    })
}

exports.admin_vehicleupdate_get = function(req, res) {
    const token = localStorage.getItem('token')
    const decode = jwt.verify(token, 'kodSzyfrujacy')

    req.user = decode
    const id = req.params.id
    Vehicle.findOne({ _id : id }).then(function(vehicle) {
        res.render('vehicle/admin_vehicleupdate', { item: vehicle, id: id, login: req.user.login })
    })
}

exports.admin_vehicleupdate_post = function(req, res) {
    let vehicle = {}
    vehicle.nazwa = req.body.nazwa
    vehicle.typ = req.body.typ
    vehicle.nrrejestracyjny = req.body.nrrejestracyjny

    const id = req.params.id

    Vehicle.findByIdAndUpdate(id, vehicle, function(err, docs) {
        if(err) {
            console.log(err)
            res.render('vehicle/admin_vehicleupdate_fail', { login: req.user.login })
        }
        else {
            res.redirect('/vehicles/admin')
        }
    })
}

exports.admin_vehicledelete_post = function(req, res) {
    id = req.body.id
    Vehicle.findByIdAndDelete(id, function(err,docs) {
        if(err) {
            console.log(err)
            res.render('vehicle/admin_vehicledelete_fail', { login: req.user.login })
        }
        else {
            res.redirect('/vehicles/admin')
        }
    })
}