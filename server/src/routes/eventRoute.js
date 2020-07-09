const express = require('express');
const router = express.Router();
const {
  getAllUserEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require('../controllers/eventController');

router.route('/').get(getAllUserEvents);

router.route('/').post(createEvent);

router.route('/').delete(deleteEvent);

router.route('/').put(updateEvent);

module.exports = router;
