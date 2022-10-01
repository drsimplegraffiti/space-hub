const { Op } = require('sequelize'); // OP is an alias for Sequelize.Op (https://sequelize.org/master/manual/model-querying-basics.html#operators)
const db = require('../models');
const sendEmail = require('../utils/send_email');
const sendSms = require('../utils/send_sms');

const User = db.user;
const Booking = db.booking;
const HouseListing = db.house_listing;

exports.createBooking = async (req, res) => {
  try {
    const { house_id, guest_id, start_date, end_date, total_price } = req.body;

    //validate request
    if (!(house_id || guest_id || start_date || end_date, total_price)) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    }

    // find a single house listing with an id and include the host details
    const house = await HouseListing.findOne({
      where: { id: house_id },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email', 'phone', 'role'],
        },
      ],
    });

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    const booking = await Booking.create({
      house_id: house.dataValues.id,
      guest_id: req.user.id,
      start_date,
      end_date,
      total_price,
    });

    // get the owner's email and phone number
    const owner = await User.findOne({
      where: { id: house.dataValues.owner_id },
    });
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    // send email to owner
    const host_email = owner.dataValues.email;
    const host_phone = owner.dataValues.phone;
    const host_name = owner.dataValues.name;
    const access_code = Math.floor(100000 + Math.random() * 900000);
    // send email to host
    await sendEmail({
      email: host_email,
      subject: 'New booking request',
      text: `You have a new booking request from ${booking.guest_id} for your house ${house.title}.`,
    });

    // send sms to host
    await sendSms(host_name, host_phone, access_code);

    return res.status(201).json({ booking });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

// User gets all bookings made by them

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { guest_id: req.user.id },
    });
    if (!bookings) {
      return res.status(404).json({ message: 'No booking found' });
    }
    return res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

// Search for bookings by date

exports.searchBookings = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const bookings = await Booking.findAll({
      where: {
        start_date: {
          [Op.between]: [start_date, end_date],
        },
      },
    });
    if (!bookings) {
      return res.status(404).json({ message: 'No booking found' });
    }
    return res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

