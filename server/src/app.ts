import "source-map-support/register";
import express, { json as jsonBodyParser } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import addEventService from "./service/addEventService";
import deleteEventService from "./service/deleteEventService";
import signUpEventService from "./service/signUpEventService";
import updateEventService from "./service/updateEventService";
import i18nextMiddleware from "i18next-http-middleware";
import i18next from "i18next";

export const database = new PrismaClient();
export const app = express();
const port = 5001;

app.use(i18nextMiddleware.handle(i18next));
app.use(jsonBodyParser());
app.use(cors());
app.post("/event", addEventService);
app.delete("/event/:eventId", deleteEventService);
app.post("/event/sign-up", signUpEventService);
app.put("/event", updateEventService);
export const server = app.listen(port);
