const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('./routes/user.routes');
const houseRoute = require('./routes/house_listing.routes');
const bookingRoute = require('./routes/booking.routes');
const adminRoute = require('./routes/admin.routes');
const app = express();

const db = require('./models');

db.sequelize
  .sync()
  .then(() => {
    console.log('Drop and Resync Db');
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.use('/api', userRoute);
app.use('/api/house', houseRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/admin', adminRoute);

//404 error

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//global error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token.........');
  } else {
    next(err);
  }
});

// 500 error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
