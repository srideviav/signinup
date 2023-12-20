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

it('Should return email or username cannot be empty', (done) => {
    request(app)
        .post('/user/login')
        .send({ password: 'testPassword' })
        .then(response => {
            //console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toContain('Username or Email Cannot Be Empty');
            done()
        })
});
it('Should return password cannot be empty', (done) => {
    request(app)
        .post('/user/login')
        .send({ username: 'logintest@mail.com' })
        .then(response => {
            expect(response.body.errors).toContain('Password Cannot Be Empty');
            done()
        })
});
it('Should return password is incorrect', (done) => {
    request(app)
        .post('/user/login')
        .send({ username: 'login test', password: 'testPassword' })
        .then(response => {
            expect(response.body.errors).toBe('Incorrect Password');
            done()
        })
});
it('Should return user is not found', (done) => {
    request(app)
        .post('/user/login')
        .send({ username: 'test@example.com', password: 'testUser' })
        .then(response => {
            expect(response.body.errors).toBe('User Not Found');
            done()
        })
});
it('Should return user login successfully', (done) => {
    request(app)
        .post('/user/login')
        .send({ username: 'login test', password: 'LoginTest#123' })
        .then(response => {
            expect(response.body.message).toBe('User Logged In Successfully');
            done()
        })
});