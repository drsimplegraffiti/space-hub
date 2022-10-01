const db = require('../models');
const User = db.user;

// find all users if role is admin

exports.findAllUsers = async (req, res) => {
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
    const users = await User.findAll();
    return res.status(200).json({ users });
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

//find a specific user by id
exports.findUserById = async (req, res) => {
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
    const single_user = await User.findOne({ where: { id: req.params.id } });
    return res.status(200).json(single_user);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// See all listings with the owner's name
exports.findAllHouseListings = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized to perform this role..' });
    }
    const houseListings = await HouseListing.findAll({
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['name', 'email', 'role', 'id'],
        },
      ],
    });
    return res.status(200).json({ houseListings });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
