import { app, server } from "~root/app";
import request from "supertest";

afterAll(() => {
  server.close();
});

describe("Event test", () => {
  it("delete event with success by REST", (done) => {
    const eventId = 19;
    request(app)
      .delete(`/event/${eventId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .end(done);
  });
});
