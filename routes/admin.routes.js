const express = require('express');
const router = express.Router();
const {
  deleteHouseListing,
  findAllUsers,
  findUserById,
  findAllHouseListings,
} = require('../controllers/admin.controller');

const  authenticate  = require("../middleware/isAuth");

router.get('/users', authenticate, findAllUsers);
router.get('/users/:id', authenticate, findUserById);
router.get('/houseListings', authenticate, findAllHouseListings);

router.delete('/houseListings/:id', authenticate, deleteHouseListing);

module.exports = router;
