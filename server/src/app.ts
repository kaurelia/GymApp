import "source-map-support/register";
import express, { json as jsonBodyParser } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import addEventService from "./service/addEventService";
import deleteEventService from "./service/deleteEventService";
import signUpEventService from "./service/signUpEventService";

export const database = new PrismaClient();
const app = express();
const port = 5001;

app.use(jsonBodyParser());
app.use(cors());
app.post("/event", addEventService);
app.delete("/event/:eventId", deleteEventService);
app.post("/event/sign-up", signUpEventService);

export const server = app.listen(port);
