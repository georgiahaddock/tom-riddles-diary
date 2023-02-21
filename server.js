const express = require('express');
const {DiaryEntry} = require('./models/DiaryEntry.js');
const app = express();
const port = 3000;
const { sequelize } = require('./db/db');

app.get('/diaryentries', async(req, res, next) => {
    try{
        const diaryEntries = await DiaryEntry.findAll();

        if(diaryEntries){
            res.send(diaryEntries);
            next();
        }else{
            res.send("Entries not found! There must be an error somewhere.")
        }
    }catch(err){
        res.send(err);
        next(err);
    }
});

app.listen(port, () => {
    sequelize.sync({ force: false });
    console.log(`listening on port http://localhost:${port}/diaryentries`);
})
