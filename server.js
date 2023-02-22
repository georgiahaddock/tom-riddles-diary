const cors = require('cors');
const express = require('express');
const {DiaryEntry} = require('./models/DiaryEntry.js');
const app = express();
const port = 3000;
const { sequelize } = require('./db/db');
const auth0 = require('./auth');

app.use(express.json());
app.use(auth0); // auth router attaches /login, /logout, and /callback routes to the baseURL


app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'); // req.isAuthenticated is provided from the auth router
});

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

app.put('/diaryentries/:id', async (req, res, next) =>{
    console.log(req.body);
    try{
        const diaryEntry = await DiaryEntry.findByPk(req.params.id);
        if(!diaryEntry){
            throw new Error('entry not found!');
        }
        if(req.body.title){
            diaryEntry.title = req.body.title;
            await diaryEntry.save();
        }
        if(req.body.passage){
            diaryEntry.passage = req.body.passage;
            await diaryEntry.save();
        }
        res.status(200).send("modified.")
    }catch(err){
        res.status(500)._construct(err.message);
        next(err);
    }
})

app.listen(port, () => {
    sequelize.sync({ force: false });
    console.log(`listening on port http://localhost:${port}/diaryentries`);
})
