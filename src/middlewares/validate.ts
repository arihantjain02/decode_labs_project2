import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.type === "field" ? (e as { path: string }).path : "unknown", message: e.msg })),
    });
    return;
  }
  next();
}
