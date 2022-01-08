import { Request, Response } from "express";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
import eventValidator from "~root/validation/eventValidator";
import { ValidationError } from "yup";
import addEventRepo from "~root/repository/addEvent";

const addEventService = async (request: Request, response: Response) => {
  const { name, fromDate, toDate, participantId }: ExtendedPrismaEvent =
    request.body;
  try {
    await eventValidator(new Date()).validate({
      name,
      fromDate,
      toDate,
      participantId,
    });
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
    await addEventRepo({ name, fromDate, toDate, participantId });
  } catch (error) {
    console.log(error);
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(201).json({ msg: "Success" });
};
export default addEventService;
