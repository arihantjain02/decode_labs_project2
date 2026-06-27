import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ success: false, message: "Internal server error" });
}
