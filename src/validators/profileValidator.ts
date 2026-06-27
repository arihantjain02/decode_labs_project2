import { body } from "express-validator";

export const profileValidator = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().trim().isEmail().withMessage("Valid email required"),
  body("college").optional().trim().notEmpty().withMessage("College cannot be empty"),
  body("branch").optional().trim().notEmpty().withMessage("Branch cannot be empty"),
];
