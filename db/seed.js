const { sequelize } = require('./db');
const { DiaryEntry } = require('../models/DiaryEntry');
const entries = require('./seedData');

const seed = async () => {
  try{
    await sequelize.sync( {force: true} ); //this clears the db before population
    await DiaryEntry.bulkCreate(entries);
    if(await DiaryEntry.findAll()!=null){
      console.log('Seeded!')
    }
    // sequelize.close();
  }catch(err){
    console.error(err);
  }
};

  module.exports = seed;
