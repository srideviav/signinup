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

it('Should return Password cannot be empty', (done) => {
    request(app)
        .post('/user/resetPassword')
        .then(response => {
            expect(response.body.errors).toContain('Password Cannot Be Empty');
            done()
        })
});

it('Should return Email cannot be empty', (done) => {
    request(app)
        .post('/user/resetPassword')
        .then(response => {
            expect(response.body.errors).toContain('Email Cannot Be Empty');
            done()
        })
});

it('Should return Email not found ', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ email: "login@mail.com", password: "TestPassword@123" })
        .then(response => {
            expect(response.body.errors).toBe('Email not found');
            done()
        })
});

it('Should return Password is not valid', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ email: "logintest@mail.com", password: "T123" })
        .then(response => {
            expect(response.body.errors).toContain('Password Should contain atleast 1 uppercase,1 lowercase, 1 integer,1 special character');
            done()
        })
});


it('Should return password changed successfully', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ email: "logintest@mail.com", password: "TestPassword@123" })
        .then(response => {
            expect(response.body.message).toBe('Password have been changed successfully');
            done()
        })
});