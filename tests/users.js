const expect = require('chai').expect;
const request = require('supertest');
const issueToken = require('./helpers/issueToken');
const app = require('../dist/server').default();
const chance = require('chance')();

describe('User login', () => {
    const id = 1;

    it('Successfully login', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });

        expect(response.status).eq(200);
        expect(response.body.token).a('string');
        expect(response.body.refreshToken).a('string');
    })

    it('Invalid login', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ email: 'INVALID', password: 'INVALID' });
        expect(response.status).eq(403);
    })

    it('Get error on expired token', async () => {
        const token = issueToken({ id }, { expiresIn: '0ms' });
        const response = await request(app)
            .post(`/user/profile/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).eq(401);
    })

    it('Get new token', async () => {
        const auth = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });
        expect(auth.status).eq(200);
        const response = await request(app)
            .post('/user/refresh')
            .send({ token: auth.body.refreshToken, user_id: id });
        expect(response.status).eq(200);
        expect(response.body.token).a('string');
        expect(response.body.refreshToken).not.eq(auth.body.refreshToken);
    })

    it('New token with invalid token', async () => {
        const response = await request(app)
            .post('/user/refresh')
            .send({ token: 'INVALID', user_id: id });
        expect(response.status).eq(404);
    })

    it('Logout/Command with token', async () => {
        const auth = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });
        expect(auth.status).eq(200);
        const response = await request(app)
            .post('/user/logout')
            .set('Authorization', `Bearer ${auth.body.token}`);
        expect(response.status).eq(200);
    })
})

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
});