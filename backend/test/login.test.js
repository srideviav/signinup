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

test('Should return email or username cannot be empty', () => {
    request(app)
        .post('/user/login')
        .send({ password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Username or Email Cannot Be Empty');
        })
});
test('Should return password cannot be empty', () => {
    request(app)
        .post('/user/login')
        .send({ email: 'test@example.com' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Password Cannot Be Empty');
        })
});
test('Should return password in incorrect', () => {
    request(app)
        .post('/user/login')
        .send({ username: 'testUser', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('Incorrect Password');
        })
});
test('Should return user is not found', () => {
    request(app)
        .post('/user/login')
        .send({ email: 'test@example.com', password: 'testUser' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.errors).toBe('User Not Found');
        })
});
test('Should return user login successfully', () => {
    request(app)
        .post('/user/login')
        .send({ username: 'testUser', password: 'testPassword' })
        .then(response => {
            console.log(response.body, "--------jest response---------")
            expect(response.body.message).toBe('User Logged In Successfully');
        })
});