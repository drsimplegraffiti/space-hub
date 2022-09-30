module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define('booking', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    guest_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    house_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Booking;
};
