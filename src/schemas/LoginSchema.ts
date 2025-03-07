import * as yup from "yup";
export const LoginSchema = () => {
  return yup.object({
    userName: yup.string().required("userName is required"),
    password: yup.string().required("password is more than 6 digit").min(6),
  });
};
