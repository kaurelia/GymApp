import * as yup from "yup";

const signUpToEventValidator = () => {
  return yup.object().shape({
    userId: yup
      .number()
      .typeError("User id must be number")
      .required("User id required"),
    eventId: yup
      .number()
      .typeError("Event id must be number")
      .required("Event id required"),
  });
};
export default signUpToEventValidator;
