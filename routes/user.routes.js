const express = require('express');
const router = express.Router();

const {
  UserSignup,
  UserLogin,
  switchToAdmin,
} = require('../controllers/user.controllers');

router.post('/signup', UserSignup);
router.post('/login', UserLogin);
router.post('/switch-to-admin', switchToAdmin);

module.exports = router;
