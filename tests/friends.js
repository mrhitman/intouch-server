const expect = require('chai').expect;
const request = require('supertest');
const issueToken = require('./helpers/issueToken');
const app = require('../dist/server').default();

describe('Friend', () => {
    it ('unfollow', async () => {
        const auth = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });

        const response = await request(app)
            .post('/friend/unfollow')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send({ id: 1, friend_id: 2 });

        expect(response.status).eq(200);
        expect(response.body.success).eq(true);
    });

    it('follow new', async () => {
        const auth = await request(app)
            .post('/user/login')
            .send({ email: 'test@test.com', password: '1' });

        const response = await request(app)
            .post('/friend/follow')
            .set('Authorization', `Bearer ${auth.body.token}`)
            .send({ id: 1, friend_id: 2 });

        expect(response.status).eq(200);
        expect(response.body.success).eq(true);
    });
});