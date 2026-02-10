import dotenv from 'dotenv';
import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../app.ts';
import Resource from '../models/Resource.ts';
dotenv.config();
console.log("--- process.env.MONGO_URI", process.env.MONGO_URI)
describe('Resource Routes', () => {
    before(async () => {
        if(!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterEach(async () => {
        await Resource.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }); 

    it('POST /api/resources - should create a new resource', async () => {
        const res = await request(app)
            .post('/api/resources')
            .send({ name: 'Test Resource 1', context: 'Test Context 1', amount: 100 });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', 'Test Resource 1');
    });

    it('GET /api/resources - should list all resources', async () => {
        await Resource.create({ name: 'Test Resource 2', context: 'Test Context 2', amount: 200 });
        const res = await request(app).get('/api/resources');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.not.empty;
    });

    it('GET /api/resources/:id - should get resource by ID', async () => {
        const resource = await Resource.create({ name: 'Test Resource 3', context: 'Test Context 3', amount: 300 });
        const res = await request(app).get(`/api/resources/${resource._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('name', 'Test Resource 3');
    });
});