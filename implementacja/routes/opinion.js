const express = require('express')
const router = express.Router()

var opinion_controller = require('../controllers/opinionController')
const authenticate_logged_user = require('../middleware/authenticate_logged_user')

router.get('/', opinion_controller.index)
router.post('/add', authenticate_logged_user, opinion_controller.addopinion)

module.exports = router