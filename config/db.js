// configure postgres
module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'Bassguitar1',
  DB: 'gq',
  dialect: 'postgres',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
