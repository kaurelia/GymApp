import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { ValidationError } from "yup";
import updateEventRepo from "~root/repository/update/updateEvent";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
import updateEventValidator from "~root/validation/updateEventValidator";

const updateEventService = async (
  request: Request,
  response: Response,
): Promise<void> => {
  let resp: ExtendedPrismaEvent & { eventId: number } = request.body;

  try {
    resp.fromDate = parseISO(resp.fromDate as string);
    resp.toDate = parseISO(resp.toDate as string);
    await updateEventValidator().validate(resp, {
      abortEarly: false,
      strict: true,
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
    await updateEventRepo(resp);
  } catch (error) {
    console.log(error);

    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(200).json({ msg: "Success" });
};
export default updateEventService;
