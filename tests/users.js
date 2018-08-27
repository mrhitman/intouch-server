const expect = require('chai').expect;
const request = require('supertest');
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

    it('Get 401 status on expaired token', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ email: 'INVALID', password: 'INVALID' });
    });
});