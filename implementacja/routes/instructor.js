const express = require('express')
const router = express.Router()

var instructor_controller = require('../controllers/instructorController')
const authenticate_logged_instructor = require('../middleware/authenticate_logged_instructor')

router.get('/list', instructor_controller.instructor_list)
router.get('/', authenticate_logged_instructor, instructor_controller.instructor_index)

router.get('/add', authenticate_logged_instructor, instructor_controller.instructor_adddata_get)
router.post('/add', authenticate_logged_instructor, instructor_controller.instructor_adddata_post)

router.get('/data', authenticate_logged_instructor, instructor_controller.instructor_checkdata_get)
router.get('/data/update/:id', authenticate_logged_instructor, instructor_controller.instructor_updatedata_get)
router.post('/data/update/:id', authenticate_logged_instructor, instructor_controller.instructor_updatedata_post)

router.get('/course/check', authenticate_logged_instructor, instructor_controller.instructor_checkcourse_get)
router.post('/course/end', authenticate_logged_instructor, instructor_controller.instructor_endcourse_post)

router.get('/lecture', authenticate_logged_instructor, instructor_controller.instructor_lectureindex_get)
router.get('/lecture/add', authenticate_logged_instructor, instructor_controller.instructor_lectureadd_get)
router.post('/lecture/add', authenticate_logged_instructor, instructor_controller.instructor_lectureadd_post)
router.get('/lecture/update/:id', authenticate_logged_instructor, instructor_controller.instructor_lectureupdate_get)
router.post('/lecture/update/:id', authenticate_logged_instructor, instructor_controller.instructor_lectureupdate_post)
router.post('/lecture/delete', authenticate_logged_instructor, instructor_controller.instructor_lecturedelete_post)
router.post('/lecture/complete', authenticate_logged_instructor, instructor_controller.instructor_completelecture_post)

router.get('/drivinglesson', authenticate_logged_instructor, instructor_controller.instructor_drivinglessonindex_get)
router.get('/drivinglesson/add', authenticate_logged_instructor, instructor_controller.instructor_drivinglessonadd_get)
router.post('/drivinglesson/add', authenticate_logged_instructor, instructor_controller.instructor_drivinglessonadd_post)
router.get('/drivinglesson/update/:id', authenticate_logged_instructor, instructor_controller.instructor_drivinglessonupdate_get)
router.post('/drivinglesson/update/:id', authenticate_logged_instructor, instructor_controller.instructor_drivinglessonupdate_post)
router.post('/drivinglesson/delete', authenticate_logged_instructor, instructor_controller.instructor_drivinglessondelete_post)
router.post('/drivinglesson/complete', authenticate_logged_instructor, instructor_controller.instructor_completedrivinglesson_post)

router.get('/internalexam', authenticate_logged_instructor, instructor_controller.instructor_internalexamindex_get)
router.get('/internalexam/add', authenticate_logged_instructor, instructor_controller.instructor_internalexamadd_get)
router.post('/internalexam/add', authenticate_logged_instructor, instructor_controller.instructor_internalexamadd_post)
router.get('/internalexam/update/:id', authenticate_logged_instructor, instructor_controller.instructor_internalexamupdate_get)
router.post('/internalexam/update/:id', authenticate_logged_instructor, instructor_controller.instructor_internalexamupdate_post)
router.post('/internalexam/delete', authenticate_logged_instructor, instructor_controller.instructor_internalexamdelete_post)
router.post('/internalexam/complete', authenticate_logged_instructor, instructor_controller.instructor_completeinternalexam_post)

module.exports = router