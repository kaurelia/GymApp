import express, { Request, Response } from "express";
import { Event as PrismaEvent } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const database = new PrismaClient();
const app = express();
const port = 5001;
type EventRequest = Request & {
  body: PrismaEvent;
};
app.post("/event", (request: EventRequest, response: Response) => {
  const {
    body: { name },
  } = request;
});
export const server = app.listen(port);
