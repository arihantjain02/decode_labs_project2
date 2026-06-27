import { body } from "express-validator";

export const submitInterviewValidator = [
  body("questionId").trim().notEmpty().withMessage("Question ID is required"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("answer").trim().isLength({ min: 10 }).withMessage("Answer must be at least 10 characters"),
];
