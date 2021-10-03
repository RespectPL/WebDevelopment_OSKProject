const express = require('express')
const router = express.Router()

var admin_controller = require('../controllers/adminController')
const authenticate_logged_admin = require('../middleware/authenticate_logged_admin')

router.get('/', authenticate_logged_admin, admin_controller.admin_index)

module.exports = router