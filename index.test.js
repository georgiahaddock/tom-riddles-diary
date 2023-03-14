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
        passage: 'Why does the boy still live!!?!',
    };
    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });
    describe('GET /diaryentries', () => {
        it('Should return list of correct diary entries', async () => {
            // make a request
            const response = await request(app).get('/diaryentries');
            // assert a response code
            //expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            // expect(response.body[0]).toEqual(expect.objectContaining(diaryEntries[0]));
            diaryEntries.forEach(entry => {
                expect(response.text).toContain(entry.id);
                expect(response.text).toContain(entry.title);
                expect(response.text).toContain(entry.passage);
                expect(response.text).toContain(entry.createdAt.toISOString());
                });
        });
    });

});
