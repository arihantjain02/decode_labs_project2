import { body } from "express-validator";

export const dsaUpdateValidator = [
  body("topic").trim().notEmpty().withMessage("Topic name is required"),
  body("solved").isInt({ min: 0 }).withMessage("Solved count must be a non-negative integer"),
];
