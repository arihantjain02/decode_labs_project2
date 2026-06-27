import type { Request, Response } from "express";
import { readDb } from "../utils/fileDb.js";
import { success, serverError } from "../utils/response.js";

export function getDashboard(req: Request, res: Response) {
  try {
    const dashboard = readDb("dashboard.json", {});
    success(res, dashboard, "Dashboard data fetched");
  } catch (err) {
    serverError(res);
  }
}
