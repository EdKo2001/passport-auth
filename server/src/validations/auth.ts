import { body } from "express-validator";

const validation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export const resetPasswordValidation = [
  body("email", "Invalid email format").isEmail(),
];

export const updatePasswordValidation = [
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export default validation;
