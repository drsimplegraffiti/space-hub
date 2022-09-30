const express = require('express');
const { createBooking } = require('../controllers/booking.controller');
const authenticate = require('../middleware/isAuth');

const router = express.Router();

router.post('/create', authenticate, createBooking);

module.exports = router;
