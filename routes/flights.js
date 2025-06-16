const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.searchFlights);
router.get('/:id', flightsController.getFlightById);

module.exports = router;
