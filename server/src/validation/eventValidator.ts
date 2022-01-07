import * as yup from "yup";

const eventValidator = (minDate: Date) => {
  return yup.object().shape({
    name: yup
      .string()
      .typeError("Name must be a string")
      .required("Name required"),
    fromDate: yup
      .date()
      .required("Date required")
      .min(minDate, "Date can't be past date")
      .typeError("Date must be a date"),
    toDate: yup
      .date()
      .required("Date required")
      .min(minDate, "Date can't be past date")
      .typeError("Date must be a date"),
  });
};
export default eventValidator;
