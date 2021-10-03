const express = require('express')
const router = express.Router()

var participant_controller = require('../controllers/participantController')
const authenticate_logged_participant = require('../middleware/authenticate_logged_participant')

router.get('/', authenticate_logged_participant, participant_controller.participant_index)

router.get('/add', authenticate_logged_participant, participant_controller.participant_adddata_get)
router.post('/add', authenticate_logged_participant, participant_controller.participant_adddata_post)

router.get('/data', authenticate_logged_participant, participant_controller.participant_checkdata_get)
router.get('/data/update/:id', authenticate_logged_participant, participant_controller.participant_updatedata_get)
router.post('/data/update/:id', authenticate_logged_participant, participant_controller.participant_updatedata_post)

router.get('/course/register', authenticate_logged_participant, participant_controller.participant_courseregister_get)
router.post('/course/register', authenticate_logged_participant, participant_controller.participant_courseregister_post)
router.get('/course/check', authenticate_logged_participant, participant_controller.participant_checkcourse_get)
router.post('/course/pay', authenticate_logged_participant, participant_controller.participant_paycourse_post)

router.get('/lecture', authenticate_logged_participant, participant_controller.participant_checklecture_get)

router.get('/drivinglesson', authenticate_logged_participant, participant_controller.participant_checkdrivinglesson_get)

router.get('/internalexam', authenticate_logged_participant, participant_controller.participant_checkinternalexam_get)

module.exports = router