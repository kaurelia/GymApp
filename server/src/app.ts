import express, { json as jsonBodyParser } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import addEvent from "./service/addEventService";

export const database = new PrismaClient();
const app = express();
const port = 5001;

app.use(jsonBodyParser());
app.use(cors());
app.post("/event", addEvent);
export const server = app.listen(port);
