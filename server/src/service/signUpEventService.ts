import { Request, Response } from "express";
import signUpToEvent from "~root/repository/create/signUpToEvent";
import signUpToEventValidator from "~root/validation/signUpToEventValidator";
import { UserEvent } from "@prisma/client";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const signUpEventService = async (
  request: Request,
  response: Response,
): Promise<void> => {
  let { userId, eventId }: UserEvent = request.body;
  try {
    await signUpToEventValidator().validate(
      { userId, eventId },
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
    await signUpToEvent(userId, eventId);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        response
          .header("application/json")
          .status(200)
          .json({ error: "Użytkownik został ju wcześniej zapisany" });
        return;
      }
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        response
          .header("application/json")
          .status(200)
          .json({ error: "Nie istnieje taki użytkownik lub wydarzenie" });
        return;
      }
    }
    console.log(error);

    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(200).json({ msg: "Success" });
};
export default signUpEventService;
