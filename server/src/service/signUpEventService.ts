import { Request, Response } from "express";
import signUpToEvent from "~root/repository/signUpToEvent";
import signUpToEventValidator from "~root/validation/signUpToEventValidator";
import { UserEvent } from "@prisma/client";

const signUpEventService = (request: Request, response: Response) => {
  let { userId, eventId }: UserEvent = request.body;
  try {
    signUpToEventValidator().validate({ userId, eventId });
  } catch (error) {}
  try {
    signUpToEvent(userId, eventId);
  } catch (error) {
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(200).json({ msg: "Success" });
};
export default signUpEventService;
