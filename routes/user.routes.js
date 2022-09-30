const express = require('express');
const { getUserBookings } = require('../controllers/booking.controller');
const router = express.Router();

const {
  UserSignup,
  UserLogin,
  switchToAdmin,
} = require('../controllers/user.controllers');
const authenticate = require('../middleware/isAuth');

router.post('/signup', UserSignup);
router.post('/login', UserLogin);

router.post('/switch-to-admin', switchToAdmin);
router.get('/bookings', authenticate, getUserBookings);


module.exports = router;
