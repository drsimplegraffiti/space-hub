const express = require('express');
const {
  createBooking,
  searchBookings,
} = require('../controllers/booking.controller');
const authenticate = require('../middleware/isAuth');

const router = express.Router();

router.post('/create', authenticate, createBooking);
router.get('/search/byDate', authenticate, searchBookings);

module.exports = router;
