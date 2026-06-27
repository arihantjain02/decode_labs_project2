import { body } from "express-validator";

export const plannerValidator = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("time").trim().notEmpty().withMessage("Task time is required"),
  body("day").trim().notEmpty().withMessage("Day is required"),
];

export const plannerUpdateValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
];
