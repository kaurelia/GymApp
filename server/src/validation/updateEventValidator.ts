import * as yup from "yup";

const updateEventValidator = () => {
  return yup.object().shape({
    name: yup.string().typeError("Name must be a string"),
    toDate: yup.date().typeError("To date be a date"),
    fromDate: yup.date().typeError("From date must be a date"),
    eventId: yup
      .number()
      .typeError("Event id must be number")
      .required("Event id required"),
    ownerId: yup
      .number()
      .typeError("Owner id must be number")
      .required("Owner id required"),
  });
};
export default updateEventValidator;
