const request = require('supertest');
const { app, DB } = require('../index');
const { default: mongoose } = require('mongoose');

beforeAll(async() => {
    await mongoose.connect(DB);
    console.log("Test DB connected Successfully")
});

afterAll(async() => {
    await mongoose.disconnect(DB);
    console.log("Test DB disconnected Sucessfully")
});

test('Should return Email cannot be empty', () => {
    request(app)
        .post('/user/resetPassword')
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Email Cannot Be Empty');
        })
});
test('Should return Email sent', () => {
    request(app)
        .post('/user/resetPassword')
        .send({ email: 'test@example.com' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.message).toBe('Email sent to registered mail ID');
        })
});
test('Should return Email not found', () => {
    request(app)
        .post('/user/resetPassword')
        .send({ email: 'testUser', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Email not found');
        })
});