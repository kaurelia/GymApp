import { Request, Response } from "express";
import deleteEvent from "~root/repository/delete/deleteEvent";
import { ValidationError } from "yup";
import deleteEventValidator from "~root/validation/deleteEventValidator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

type DeleteEventRequest = Request & { params: { eventId: string } };

const deleteEventService = async (
  request: DeleteEventRequest,
  response: Response,
): Promise<void> => {
  const {
    params: { eventId },
  }: DeleteEventRequest = request;
  let eventIdNumber: number;
  try {
    eventIdNumber = parseInt(eventId);
    await deleteEventValidator().validate(
      {
        eventIdNumber,
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
    await deleteEvent(eventIdNumber);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        response
          .header("application/json")
          .status(404)
          .json({ error: "Nie istnieje taki event" });
        return;
      }
    }
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(200).json({ msg: "Success" });
};
export default deleteEventService;
