import { Request, Response } from "express";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
import eventValidator from "~root/validation/eventValidator";
import { ValidationError } from "yup";

const addEventService = async (response: Response, request: Request) => {
  const { name, fromDate, toDate }: ExtendedPrismaEvent = request.body;
  try {
    await eventValidator(new Date()).validate({ name, fromDate, toDate });
  } catch (error) {
    if (error instanceof ValidationError) {
      response
        .header("application/json")
        .status(400)
        .send({ error: error.errors });
      return;
    }
    response.header("application/json").sendStatus(500);
    return;
  }
};
export default addEventService;
