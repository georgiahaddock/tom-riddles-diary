const Sequelize = require('sequelize')
const {sequelize} = require("../db/db");

const DiaryEntry = sequelize.define("diary entry", {
    title: Sequelize.STRING,
    passage: Sequelize.STRING,
})

module.exports = {DiaryEntry};
