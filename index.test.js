const request = require("supertest");
const app = require("./index");
const mongoose = require ('mongoose')

describe("Test the test path", () => {
  beforeAll(done => {
    done()
  })

  afterAll(done => {
    mongoose.connection.close()
    done()
  })

  test("It should response the GET method", () => {
    return request(app)
      .get("/test")
      .expect(200);
  });
});