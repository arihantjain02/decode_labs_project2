import { body } from "express-validator";

export const roadmapValidator = [
  body("targetCompany").trim().notEmpty().withMessage("Target company is required"),
  body("currentLevel").trim().notEmpty().withMessage("Current level is required"),
  body("weeks").isInt({ min: 1, max: 52 }).withMessage("Weeks must be between 1 and 52"),
];
