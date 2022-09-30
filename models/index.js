const dbConfig = require('../config/db.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //   operatorsAliases: false,
  logging: false, // disable logging; default: console.log

  pool: {
    max: dbConfig.pool.max, 
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {}; // create an empty object to hold the models and the sequelize connection object (db.sequelize) and the Sequelize library (db.Sequelize) for later use in the application (see the user.model.js file)

db.Sequelize = Sequelize; // add the Sequelize library to the db object
db.sequelize = sequelize; // add the sequelize connection object to the db object

db.user = require('./user.model.js')(sequelize, Sequelize);

// import the house_listing and reference the user model
db.house_listing = require('./house_listing.model.js')(sequelize, Sequelize);

// create the association between the user and the house_listing models
db.user.hasMany(db.house_listing, { as: 'house_listings' });
db.house_listing.belongsTo(db.user, {
  foreignKey: 'owner_id',
  as: 'owner',
});

// import the booking and reference the user and house_listing models
db.booking = require('./booking.model.js')(sequelize, Sequelize);

// create the association between the user and the booking models
db.user.hasMany(db.booking, { as: 'bookings' });
db.booking.belongsTo(db.user, {
  foreignKey: 'guest_id',
  as: 'guest',
});

// create the association between the house_listing and the booking models
db.house_listing.hasMany(db.booking, { as: 'bookings' });
db.booking.belongsTo(db.house_listing, {
  foreignKey: 'house_id',
  as: 'house',
});

module.exports = db;
