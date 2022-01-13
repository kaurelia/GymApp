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
});
export {};
