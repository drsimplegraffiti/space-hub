const express = require('express');
const {
  createHouse,
  findAll,
  findOne,
  updateHouseListing,
  deleteHouseListing,
  deleteAll,
  findAllAvailableByGuest,
  findAllHousesBelongingToMe,
} = require('../controllers/house_listing.controller');
const authenticate = require('../middleware/isAuth');
const { upload } = require('../utils/image_upload');
const router = express.Router();

router.post('/create', upload.array('images', 12), authenticate, createHouse);
router.get('/all', authenticate, findAll);

router.put('/modify/:id', authenticate, updateHouseListing);

router.delete('/single/house/:id', authenticate, deleteHouseListing);

router.all('/drop/all', authenticate, deleteAll);

router.get('/my/houses', authenticate, findAllHousesBelongingToMe);

// unprotected routes
router.get('/single/house/:id', findOne);
router.get('/available', findAllAvailableByGuest);

module.exports = router;
