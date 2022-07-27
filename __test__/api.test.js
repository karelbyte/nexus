const request = require("supertest");
const baseURL = "http://localhost:8080";

// if test not pass -> npm start and run test egain
test("check api - brand ", async () => {
  const res = await request(baseURL).get("/brands");
  expect(res.statusCode).toBe(200);
  expect(res.body.error).toBe(undefined);
});

test("check api - /brands/:id/models", async () => {
  const response = await request(baseURL).get("/brands/9/models");
  expect(response.statusCode).toBe(200);
  expect(response.body.error).toBe(undefined);
});


test("check api - models?lower=<number>", async () => {
  const response = await request(baseURL).get("/models?lower=400000");
  expect(response.statusCode).toBe(200);
  expect(response.body.error).toBe(undefined);
});