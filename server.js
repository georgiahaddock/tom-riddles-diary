const express = require('express');
const {DiaryEntry} = require('./models/DiaryEntry.js');
const app = express();
const port = 3000;
const { sequelize } = require('./db/db');

app.use(express.json());

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

app.post('/diaryentries', async (req, res, next) => {
    try{
        console.log(req.body);
        let { newEntry } = req.body;
        if(!newEntry.title || !newEntry.passage){
            throw new Error('invalid request body');
        }else{
            newEntry = await DiaryEntry.create(newEntry);
            console.log('passage created!')
            res.send(newEntry);
        }
    }catch(err){
        res.send(err);
        next(err)
    }
})

app.listen(port, () => {
    sequelize.sync({ force: false });
    console.log(`listening on port http://localhost:${port}/diaryentries`);
})
