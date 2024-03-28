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

test('Should return name cannot be empty', () => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', email: 'test@example.com', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Name Cannot Be Empty');
        })
});
test('Should return username cannot be empty', () => {
    request(app)
        .post('/user/register')
        .send({ name: 'testUser', email: 'test@example.com', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Name Cannot Be Empty');
        })
});
test('Should return email cannot be empty', () => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', name: 'testUser', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Name Cannot Be Empty');
        })
});
test('Should return password cannot be empty', () => {
    request(app)
        .post('/user/register')
        .send({ username: 'testUser', email: 'test@example.com', name: 'testUser' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Name Cannot Be Empty');
        })
});
test('Should return user registered successfully', () => {
    request(app)
        .post('/user/register')
        .send({ name: "test", username: 'testUser', email: 'test@example.com', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.message).toBe('Name Cannot Be Empty');
        })
});