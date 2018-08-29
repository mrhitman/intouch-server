const expect = require('chai').expect;
const request = require('supertest');
const issueToken = require('./helpers/issueToken');
const app = require('../dist/server').default();
const chance = require('chance')();

describe('Registration', () => {
    it('success', async () => {
        const name = chance.name({ middle: true }).split(' ');
        const response = await request(app)
            .post('/user/register')
            .send({
                email: chance.email(),
                password: '1',
                first_name: name[0],
                middle_name: name[1],
                last_name: name[2],
                birthday: chance.birthday(),
                gender: 1,
                relation: 0,
                city: chance.city(),
                home_town: chance.city(),
                country: chance.country(),
                company: chance.word(),
                language: 'English',
                hobbies: '',
                priorities: '',
            });
        expect(response.status).eq(201);
    });

    it('without params', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({})
        expect(response.status).eq(400);
    });

    it('with exist user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                email: 'test@test.com',
                password: '1',
                first_name: 'test'
            })
        expect(response.status).eq(409);
    });
});