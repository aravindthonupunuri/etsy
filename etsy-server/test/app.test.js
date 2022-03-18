var app=require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
ROOT_URL = "http://localhost:3001";
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmMTkzMjM1LWMwOTgtNDczNi05MDFjLTU1N2M3NzU3N2U0NSIsImlhdCI6MTY0NTgzMTIyOH0.PgMTDs5B4E84H0OhEOzE-UsNpRgc3xYu0cm2Dt3VW5s'

describe("Post -- Registration of User",()=>{
    const data = {
        emailId: 'xyz2@gmail.com',
        name: 'xyz',
        password: '1234',
    };
    it("succesfully registered",(done)=>{
        chai.request.agent(app)
        .post("/api/user/register")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("Register with previously exisiting emailId",(done)=>{
        chai.request.agent(app)
        .post("/api/user/register")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(400);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Post -- Login of user",()=>{
    const data = {
        emailId: 'xyz2@gmail.com',
        password: '1234',
    };
    const data1 = {
        emailId: 'xyz2@gmail.com',
        password: '12345',
    };
    it("login with valid credentials",(done)=>{
        chai.request.agent(app)
        .post("/api/user/login")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("login with invalid credentials",(done)=>{
        chai.request.agent(app)
        .post("/api/user/login")
        .send(data1)
        .then(function (res){
            expect(res).to.have.status(204);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Get-- Get home items",()=>{
    it("succesfully get home items",(done)=>{
        chai.request.agent(app)
        .get("/api/items")
        .set('auth-token', token)
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("pass invalid token to get home items",(done)=>{
        chai.request.agent(app)
        .get("/api/items")
        .set('auth-token', 'invalid token')
        .then(function (res){
            expect(res).to.have.status(400);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})