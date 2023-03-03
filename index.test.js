const request = require('supertest');
const app = require('./server');

const { sequelize } = require('./db/db');
const DiaryEntry = require('./models/DiaryEntry')
const seed = require('./db/seed');
const diaryEntries = require('./db/seedData');

describe('Endpoints', () => {
    // to be used in POST test
    const testDiaryEntryData = {
        title: 'Chapter 53',
        passage: 'Why does the boy still live',
    };
    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });
    describe('GET /diaryentries', () => {
        it('should return list of correct diary entries', async () => {
            // make a request
            const response = await app.get('/diaryentries');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            console.log(diaryEntries[0]);
            console.log(response);
            expect(response.body[0]).toEqual(expect.objectContaining(diaryEntries[0]));
        });
    });
    
});
