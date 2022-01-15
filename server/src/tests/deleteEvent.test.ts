import { app } from "~root/app";
import request from "supertest";

describe("Event test", () => {
  it("delete event with success by REST", (done) => {
    const eventId = 16;
    request(app)
      .delete(`/event/${eventId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .end(done);
  });
});
