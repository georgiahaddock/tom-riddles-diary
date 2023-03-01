const { sequelize } = require('./db');
const { DiaryEntry } = require('../models/DiaryEntry');
const entries = require('./seedData.json');

const seed = async () => {
    await sequelize.sync( {force: true} ); //this clears the db before population
    await DiaryEntry.bulkCreate(entries);
};

seed()
.then(() => {
    console.log('Seeded!');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });

  module.exports = seed;
