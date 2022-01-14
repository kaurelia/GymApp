import { Request, Response } from "express";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
import eventValidator from "~root/validation/eventValidator";
import { ValidationError } from "yup";
import addEventRepo from "~root/repository/create/addEvent";
import { parseISO } from "date-fns";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const addEventService = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const {
    name,
    fromDate: fromDateAsString,
    toDate: toDateAsString,
    ownerId,
  }: Omit<ExtendedPrismaEvent, "eventStatus"> = request.body;
  let fromDate: Date;
  let toDate: Date;
  try {
    fromDate = parseISO(fromDateAsString as string);
    toDate = parseISO(toDateAsString as string);
    await eventValidator(new Date()).validate(
      {
        name,
        fromDate,
        toDate,
        ownerId,
      },
      { abortEarly: false, strict: true },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      response
        .header("application/json")
        .status(400)
        .send({ error: error.errors });
      return;
    }
    console.log(error);

    response.header("application/json").sendStatus(500);
    return;
  }
  try {
    await addEventRepo({ name, fromDate, toDate, ownerId });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        response
          .header("application/json")
          .status(400)
          .json({ error: "Nie istnieje taki owner id" });
        return;
      }
    }
    console.log(error);
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(201).json({ msg: "Success" });
};
export default addEventService;
