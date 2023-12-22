const request = require('supertest');
const app = require('../index');
const User = require('../model/userModel');

beforeAll((done) => {
    User.create({
        name: "login test",
        username: "login test",
        email: "logintest@mail.com",
        password: "LoginTest#123",
        resetToken: "12345"
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
        .send({ resetToken: "123455" })
        .then(response => {
            expect(response.body.errors).toContain('Password Cannot Be Empty');
            done()
        })
});

it('Should return OTP cannot be empty', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ password: "Test$34567" })
        .then(response => {
            expect(response.body.errors).toContain('OTP cannot be empty');
            done()
        })
});

it('Should return Invalid OTP ', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ otp: "12345nsbcm5", password: "TestPassword@123" })
        .then(response => {
            console.log(response.body, "==================9999999999999")
            expect(response.body.errors).toBe('Invalid OTP');
            done()
        })
});

it('Should return Password is not valid', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ resetToken: "4568908", password: "T123" })
        .then(response => {
            expect(response.body.errors).toContain('Password Should contain atleast 1 uppercase,1 lowercase, 1 integer,1 special character');
            done()
        })
});


it('Should return password changed successfully', (done) => {
    request(app)
        .post('/user/resetPassword')
        .send({ otp: "12345", password: "TestPassword@123" })
        .then(response => {
            console.log(response.body, "============================")
            expect(response.body.message).toBe('Password have been changed successfully');
            done()
        })
});