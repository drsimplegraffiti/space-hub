const db = require('../models');
const { Op } = require('sequelize');
const HouseListing = db.house_listing;
const User = db.user;

const { cloudinary } = require('../utils/image_upload');

// Create and Save a new HouseListing if user is authenticated and is an admin
exports.createHouse = async (req, res) => {
  try {
    const { title, description, price, image, location, is_available } =
      req.body;

    // validate request
    if (!title || !description || !price || !location) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
    // upload array of images to cloudinary and get the urls

    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path);
      images.push(result.secure_url);
      console.log('=============== uploading image ========================');
    }

    const houseListing = await HouseListing.create({
      title,
      description,
      price,
      location,
      is_available,
      photos: images,
      owner_id: req.user.id,
    });
    return res.status(201).json({ houseListing });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Retrieve all HouseListings from the database by all users and sort the results
exports.findAll = async (req, res) => {
  try {
    const houseListings = await HouseListing.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ houseListings });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Find a single HouseListing with an id
exports.findOne = async (req, res) => {
  try {
    const houseListing = await HouseListing.findOne({
      where: { id: req.params.id },
    });
    if (!houseListing) {
      return res.status(404).json({ message: 'HouseListing not found' });
    }
    return res.status(200).json({ houseListing });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Update a HouseListing by the id in the request
exports.updateHouseListing = async (req, res) => {
  try {
    const { title, description, price, image, location, is_available } =
      req.body;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
    const houseListing = await HouseListing.findOne({
      where: { id: req.params.id },
    });
    if (!houseListing) {
      return res.status(404).json({ message: 'HouseListing not found' });
    }
    const updatedHouseListing = await houseListing.update({
      title,
      description,
      price,
      location,
      is_available,
      owner_id: req.user.id,
    });
    return res.status(200).json({ updatedHouseListing });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Delete a HouseListing with the specified id in the request by admin
exports.deleteHouseListing = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
    const houseListing = await HouseListing.findOne({
      where: { id: req.params.id },
    });
    if (!houseListing) {
      return res.status(404).json({ message: 'HouseListing not found' });
    }
    await houseListing.destroy();
    return res.status(200).json({ message: 'HouseListing deleted' });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Delete all HouseListings from the database by admin
exports.deleteAll = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role' });
    }
    await HouseListing.destroy({ where: {}, truncate: false });
    return res.status(200).json({ message: 'HouseListings deleted' });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Find all published HouseListings
exports.findAllAvailableByGuest = async (req, res) => {
  try {
    const houseListings = await HouseListing.findAll({
      where: { is_available: true },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ houseListings });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// Find all HouseListings by a specific user
exports.findAllHousesBelongingToMe = async (req, res) => {
  try {
    const houseListings = await HouseListing.findAll({
      where: { owner_id: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ houseListings });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
