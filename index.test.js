const request = require("supertest");
const app = require("./index");
const mongoose = require ('mongoose')

describe("Test the test path", () => {
  beforeAll(done => {
    done()
  })

  afterAll(async (done) => {
    await mongoose.connection.close();
    done()
  })

  test("It should response the GET method", async () => {
    const res = await request(app.app).get("/test");
    expect(res.statusCode).toBe(200);
  });
});