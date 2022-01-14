import { app, server } from "~root/app";
import request from "supertest";

afterAll(() => {
  server.close();
});
const correctEvent = {
  name: "aodsnafnakj2423442345",
  fromDate: "2022-09-25T14:34:32.999Z",
  toDate: "2023-09-25T14:34:32.999Z",
  ownerId: 1,
};
const badEvent = {
  name: 123414,
  fromDate: "2021   saclm",
  toDate: 2022,
  ownerId: 1,
};
describe("Sample Test", () => {
  it("add event with success by REST", (done) => {
    request(app)
      .post("/event")
      .set("Accept", "application/json")
      .send(correctEvent)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .end(done);
  });
  it("add event to check validation by REST", (done) => {
    request(app)
      .post("/event")
      .set("Accept", "application/json")
      .send(badEvent)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400, {
        error: [
          "Name must be a string",
          "Date must be a date",
          "Date must be a date",
        ],
      })
      .end(done);
  });
});
export {};
