const express = require('express');
const router = express.Router();
const { getAllUserEvents } = require('../controllers/eventController');

router.route('/').get(getAllUserEvents);

module.exports = router;
