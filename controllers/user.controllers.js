const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const User = db.user;

exports.UserSignup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// switch user to admin
exports.switchToAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }
    user.role = 'admin';
    await user.save();
    res.status(200).json({ message: 'User role changed to admin' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
