module.exports = (sequelize, Sequelize) => {
  const HouseListing = sequelize.define('house_listing', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    photos: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },

    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  return HouseListing;
};
