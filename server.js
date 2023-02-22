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
        let { newEntry } = req.body;
        if(!newEntry.title || !newEntry.passage){
            throw new Error('invalid request body');
        }else{
            newEntry = await DiaryEntry.create(newEntry);
            console.log('passage created!')
            res.send(newEntry);
        }
    }catch(err){
        res.status(500).send(err.message);
        next(err)
    }
})

app.delete('/diaryentries/:id', async (req, res, next) =>{
    try{
        let deletedEntry = await DiaryEntry.findByPk(req.params.id);
        if(deletedEntry){
            await deletedEntry.destroy();
            console.log('deleted');
            res.status(201).send(`entry deleted with id: ${req.params.id}`);
        }else{
            throw new Error('Cannot be deleted! This entry does not exist.')
        }
    }catch(err){
        res.status(500).send(err.message);
        next(err);
    }
})

app.listen(port, () => {
    sequelize.sync({ force: false });
    console.log(`listening on port http://localhost:${port}/diaryentries`);
})
