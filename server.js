const express = require('express');
const {DiaryEntry} = require('./models/DiaryEntry.js');
const app = express();
const port = 3000;
const sequelize = require('./db');

app.get('/diaryentries', async(req, res, next) => {
    const diaryEntries = await DiaryEntry.findAll();
    res.send(diaryEntries);
})
