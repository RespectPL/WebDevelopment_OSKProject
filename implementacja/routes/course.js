const express = require('express')
const router = express.Router()

var course_controller = require('../controllers/courseController')
const authenticate_logged_admin = require('../middleware/authenticate_logged_admin')

router.get('/list', course_controller.course_list)
router.get('/admin', authenticate_logged_admin, course_controller.admin_index)

router.get('/admin/add', authenticate_logged_admin, course_controller.admin_courseadd_get)
router.post('/admin/add', authenticate_logged_admin, course_controller.admin_courseadd_post)
router.get('/admin/update/:id', authenticate_logged_admin, course_controller.admin_courseupdate_get)
router.post('/admin/update/:id', authenticate_logged_admin, course_controller.admin_courseupdate_post)

router.post('/admin/delete', authenticate_logged_admin, course_controller.admin_coursedelete_post)

module.exports = router