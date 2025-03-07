import * as yup from "yup";
export const AddNewUserSchema = () => {
  return yup.object({
    firstName: yup.string().required("first Name is required"),
    lastName: yup.string().required("last Name is required"),
    age: yup.string().required("age is required"),
  });
};
