const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to create a new meeting
router.post('/create', meetingController.createMeeting);

// Route to join an existing meeting
router.post('/join', meetingController.joinMeeting);

// Route to get meeting details
router.get('/:meetingId', meetingController.getMeetingDetails);

module.exports = router;