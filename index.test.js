const request = require("supertest");
const app = require("./index");

describe("Test the test path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/test")
      .expect(200);
  });
});