const request = require('supertest');
const app = require('../index');
const User = require('../model/userModel');

afterAll((done) => {
    User.deleteMany()
    done()
});


//describe("Register API Test cases", () => {
it('Should return name cannot be empty', (done) => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', email: 'test@example.com', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.errors).toContain('Name Cannot Be Empty');
            done()
        })
});
it('Should return username cannot be empty', (done) => {
    request(app)
        .post('/user/register')
        .send({ name: 'testUser', email: 'test@example.com', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.errors).toContain('Username Cannot Be Empty');
            done()
        })
});
it('Should return email cannot be empty', (done) => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', name: 'testUser', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.errors).toContain('Email Cannot Be Empty');
            done()
        })
});
it('Should return password cannot be empty', (done) => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', email: 'test@example.com', name: 'testUser' })
        .then(response => {
            expect(response.body.errors).toContain('Password Cannot Be Empty');
            done()
        })
});
it('Should return user registered successfully', (done) => {
    request(app)
        .post('/user/register')
        .send({ name: "test", username: 'testUser', email: 'test@example.com', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.message).toBe('User Registered Successfully');
            done()
        })
});
it('Should return user password is invalid', (done) => {
    request(app)
        .post('/user/register')
        .send({ name: "test", username: 'testsssUser', email: 'testsss@example.com', password: 'tess3' })
        .then(response => {
            expect(response.body.errors).toContain('Password Should contain atleast 1 uppercase,1 lowercase, 1 integer,1 special character');
            done()
        })
});
it('Should return email is already exists', (done) => {
    request(app)
        .post('/user/register')
        .send({ name: "test", username: 'testUsers', email: 'test@example.com', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.errors).toBe('Email is Already Exists');
            done()
        })
});
it('Should return username  is already exists', (done) => {
    request(app)
        .post('/user/register')
        .send({ name: "test", username: 'testUser', email: 'tests@examples.com', password: 'testPassword#453' })
        .then(response => {
            expect(response.body.errors).toBe('Username is Already Exists');
            done()
        })
});
//});