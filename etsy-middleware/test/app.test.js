var app=require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
ROOT_URL = "http://localhost:3001";
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyNTg0ZjgxLWFlOTItNDcyMS1iOTNkLTgyYWIzMzk0NzYwYyIsImlhdCI6MTY0NzgzNTU2NH0.PSaxCwYvbj9_3O9i53_CouD2lmsDeK4stouxjBwCvZg'
let shoptoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5NWZlNDViLTZhZjItNDNiMy1hNTRmLTJjY2NjOTA5Y2M4MCIsImlhdCI6MTY0NzgwNDg0NX0.F2SghwYRHmp83ioVJlEPYdkilK1JEJTeBiqwrxi2tuQ' 
describe("Post -- Registration of User",()=>{
    const data = {
        emailId: 'newuser1@gmail.com',
        name: 'newuser1',
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
        emailId: 'test@gmail.com',
        password: '1234',
    };
    const data1 = {
        emailId: 'test@gmail.com',
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

describe("Create-- create shop",()=>{
    let data = {
        "shopname": "shopname",
        "shopimage": "nameofimage"
    }
    let data1 = {
        "shopname": "newshopname!!!!",
        "shopimage": "nameofimage"
    }
    it("succesfully create a shop for user",(done)=>{
        chai.request.agent(app)
        .post("/api/upload/shop")
        .set('auth-token', token)
        .send(data1)
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("create shop name with duplicate shop name",(done)=>{
        chai.request.agent(app)
        .post("/api/upload/shop")
        .set('auth-token', shoptoken)
        .send(data)
        .then(function (res){
            expect(res).to.have.status(206);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("adding item to shop", () => {
    const payload = {
      itemname: "itemname",
      itemimage: "image",
      description: "description",
      price: 90,
      available_quantity: 2,
      category_id: "category",
      shopname: "shopname",
    };
    it("succesfully adding an item", (done) => {
      chai.request
        .agent(app)
        .post("/api/shop/add/item")
        .send(payload)
        .set("auth-token", shoptoken)
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
    const invalidItem = {
        itemname: "itemname",
        itemimage: "image",
        description: "description",
        price: 90,
        available_quantity: 2,
        category_id: "category"
      };
    it("trying to add item without shop name", (done) => {
      chai.request
        .agent(app)
        .post("/api/shop/add/item")
        .send(invalidItem)
        .set("auth-token", token)
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });