import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .required("E-mail is required")
    .email("Please enter valid e-mail"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.-_])[A-Za-z\d$@$!%*?&.+_]$/,
      "Password must contain upper cases, lower cases, numbers, and special characters"
    )
    .min(6, "Minimum character length is 6"),
});
