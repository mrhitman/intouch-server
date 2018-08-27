const expect = require('chai').expect;
const request = require('supertest');
const issueToken = require('./helpers/issueToken');
const app = require('../dist/server').default();

describe('User login', () => {
    it('Successfully login', async () => {

        const response = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });

        expect(response.status).to.be.eq(200);
        expect(response.body.token).to.be.a('string');
        expect(response.body.refreshToken).to.be.a('string');
    });

    it('Invalid login', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ email: 'INVALID', password: 'INVALID' });
        expect(response.status).to.be.eq(403);
    });

    it('Get error on expired token', async () => {
        const token = issueToken({ id: 1 }, { expiresIn: '0ms' });
        const response = await request(app)
            .post('/user/profile/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).to.be.eq(401);
    });

    it('Get new token', async () => {
        const token = issueToken({ id: 1 }, { expiresIn: '0ms' });
    });
});