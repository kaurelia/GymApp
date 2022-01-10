import { Request, Response } from "express";
import deleteEvent from "~root/repository/deleteEvent";
import { ValidationError } from "yup";
import deleteEventValidator from "~root/validation/deleteEventValidator";

type EventDelete = {
  eventId: number;
};
const deleteEventService = async (request: Request, response: Response) => {
  const { eventId }: EventDelete = request.body;
  deleteEvent(eventId);

  try {
    await deleteEventValidator().validate({
      eventId,
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
    await deleteEvent(eventId);
  } catch (error) {
    console.log(error);
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(201).json({ msg: "Success" });
};
export default deleteEventService;
