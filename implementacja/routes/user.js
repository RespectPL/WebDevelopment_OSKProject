const express = require('express')
const router = express.Router()

var user_controller = require('../controllers/userController')
const authenticate_logged_admin = require('../middleware/authenticate_logged_admin')

router.get('/admin', authenticate_logged_admin, user_controller.admin_index)
router.post('/admin/delete', authenticate_logged_admin, user_controller.admin_userdelete_post)

router.get('/register', user_controller.register_get)
router.post('/register', user_controller.register_post)

router.get('/login', user_controller.login_get)
router.post('/login', user_controller.login_post)

router.get('/logout', user_controller.logout)

module.exports = router