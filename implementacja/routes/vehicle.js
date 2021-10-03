const express = require('express')
const router = express.Router()

var vehicle_controller = require('../controllers/vehicleController')
const authenticate_logged_admin = require('../middleware/authenticate_logged_admin')

router.get('/list', vehicle_controller.vehicle_list)
router.get('/admin', authenticate_logged_admin, vehicle_controller.admin_index)

router.get('/admin/add', authenticate_logged_admin, vehicle_controller.admin_vehicleadd_get)
router.post('/admin/add', authenticate_logged_admin, vehicle_controller.admin_vehicleadd_post)
router.get('/admin/update/:id', authenticate_logged_admin, vehicle_controller.admin_vehicleupdate_get)
router.post('/admin/update/:id', authenticate_logged_admin, vehicle_controller.admin_vehicleupdate_post)
router.post('/admin/delete', authenticate_logged_admin, vehicle_controller.admin_vehicledelete_post)

module.exports = router