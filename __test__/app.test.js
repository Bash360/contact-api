const request = require('supertest');
const app = require('../app.js');
describe('Test for contact API', () => {
	it(' "localhost:5000/api/users" endpoint returns with a response status code of 200', async done => {
		response = await request(app).get('/api/users');
		expect(response.status).toBe(200);
		done();
	});
	it('localhost:5000/api/users endpoint sends a payload of all the contacts', async done => {
		const response = await request(app).get('/api/users');
		expect(response.body).toContainEqual({
			firstName: expect.any(String),
			lastName: expect.any(String),
			email: expect.any(String),
			contactID: expect.any(Number),
			phone: expect.any(String),
			gender: expect.any(String),
			blocked: expect.any(Number)
		});
		done();
	});
	it.skip(` makes a post request to end point "localhost:5000/api/users" creates a  new user returns a response status of 200`, async done => {
		const response = await request(app)
			.post('/api/users')
			.send({
				firstName: 'papoose',
				lastName: 'remyma',
				email: 'remy@gmail.com',
				phone: '08036960577',
				gender: 'male'
			});
		expect(response.status).toBe(200);
		expect(response.body).toContainEqual({
			firstName: 'papoose',
			lastName: 'remyma',
			email: 'remy@gmail.com',
			phone: '08036960577',
			gender: 'male',
			contactID: expect.any(Number),
			blocked: 0
		});
		done();
  });
  it('localhost:5000/api/search? endpoint responds with a response status of 200 and payload', async (done) => {
    const response = await request(app).get('/api/users/search?q=whatever');
    expect(response.status).toBe(200);
    done();
  });
  it('localhost:5000/api/users/block/id  endpoint to block contact responds with a response status of 200', async (done) => {
    const response = await request(app).put('/api/users/block/4');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
			firstName: expect.any(String),
			lastName: expect.any(String),
			email: expect.any(String),
			phone: expect.any(String),
			gender: expect.any(String),
			contactID: expect.any(Number),
			blocked: 1
    });
    done();
   });
	 it('localhost:500/api/users/blocked returns with a response of 200 and a response body of blocked user',async(done)=>{
		 const response=await request(app).get('/api/users/blocked');
		 expect(response.body).toContainEqual({
			firstName: expect.any(String),
			lastName: expect.any(String),
			email: expect.any(String),
			contactID: expect.any(Number),
			phone: expect.any(String),
			gender: expect.any(String),
			blocked: expect.any(Number)
		});
		done();

	 });
	 it.skip('localhost:500/api/users/nonblockedusers returns with a response of 200 and a response body of blocked user',async (done)=>{
		 const response= await request(app).get('/api/users/nonblockedusers');
		 expect(response.body).toContainEqual({
			firstName: expect.any(String),
			lastName: expect.any(String),
			email: expect.any(String),
			contactID: expect.any(Number),
			phone: expect.any(String),
			gender: expect.any(String),
			blocked: expect.any(Number)
		});
		done();
	 });
	 it('localhost:500/api/users/update/id returns with a response of 200 and a response body of blocked user',async (done)=>{
		 const response= await request(app).put('/api/users/update/4').send({
				firstName: 'chibuzor',
				lastName: 'kweke',
				email: 'chi@testmail.com',
				phone: '08036960577',
				gender: 'female'
			});
		 expect(response.body).toContainEqual({
			firstName: 'chibuzor',
			lastName: 'kweke',
			email: 'chi@testmail.com',
			contactID: 4,
			phone: '08036960577',
			gender: 'female',
			blocked: expect.any(Number)
		});
		done();
	 });
	 it.skip(' deletes contacts with the endpoint localhost:5000/api/users/delete/id and sends a response of 200 and number of users deleted  ',async (done)=>{
const response= await request(app).delete('/api/users/delete/21');
   expect(response.status).toBe(200);
	 expect(response.body).toMatchObject({
		 "deletedUser":1,
		 "id":"21"
	 });

done();
	 });
	 it('gets a particular user with the given id with the endpoint localhost:5000/api/users/id ',async (done)=>{
   const response = await request(app).get('/api/users/4');
	 expect(response.status).toBe(200);
	 expect(response.body).toMatchObject({
		 	firstName: expect.any(String),
			lastName: expect.any(String),
			email: expect.any(String),
			phone: expect.any(String),
			gender: expect.any(String),
			contactID: expect.any(Number),
			blocked: expect.any(Number)
	 });
	 done();
	 });
});

