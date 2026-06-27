import type { Request, Response, NextFunction } from "express";
import { readDb } from "../utils/fileDb.js";
import { unauthorized } from "../utils/response.js";

interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  token: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    unauthorized(res, "No token provided");
    return;
  }

  const token = authHeader.split(" ")[1];
  const users = readDb<User[]>("users.json", []);
  const user = users.find((u) => u.token === token);

  if (!user) {
    unauthorized(res, "Invalid or expired token");
    return;
  }

  (req as Request & { user: User }).user = user;
  next();
}
