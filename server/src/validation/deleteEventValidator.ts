import * as yup from "yup";

const deleteEventValidator = () => {
  return yup.object().shape({
    eventId: yup
      .number()
      .typeError("Event id must be number")
      .required("Event id required"),
  });
};
export default deleteEventValidator;
