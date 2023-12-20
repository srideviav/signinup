const request = require('supertest');
const app = require('../index');
const User = require('../model/userModel');

beforeAll((done) => {
    User.create({
        name: "login test",
        username: "login test",
        email: "logintest@mail.com",
        password: "LoginTest#123"
    }).then(user => {
        console.log("user created")
    }).catch(err => {
        console.log("catch the error:", err)
    })
    done()
});

afterAll((done) => {
    User.deleteMany()
    done()
});

it('Should return Email cannot be empty', (done) => {
    request(app)
        .post('/user/checkOTP')
        .then(response => {
            expect(response.body.errors).toContain('Email Cannot Be Empty');
            done()
        })
});
it('Should return Email sent', (done) => {
    request(app)
        .post('/user/checkOTP')
        .send({ resetToken: 'logintest@mail.com' })
        .then(response => {
            expect(response.body.message).toBe('Email sent to registered mail ID');
            done()
        })
});
it('Should return Email not found', (done) => {
    request(app)
        .post('/user/checkOTP')
        .send({ resetToken: 'login@mail.com' })
        .then(response => {
            expect(response.body.errors).toBe('Email not found');
            done()
        })
});