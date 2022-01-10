import express, { json as jsonBodyParser } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import addEventService from "./service/addEventService";
import deleteEventService from "./service/deleteEventService";

export const database = new PrismaClient();
const app = express();
const port = 5001;

app.use(jsonBodyParser());
app.use(cors());
app.post("/event", addEventService);
app.delete("/event", deleteEventService);

export const server = app.listen(port);
