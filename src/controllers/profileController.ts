import type { Request, Response } from "express";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, notFound, serverError } from "../utils/response.js";

interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: number;
  token: string;
  passwordHash: string;
  createdAt: string;
}

export function getProfile(req: Request, res: Response) {
  try {
    const user = (req as Request & { user: User }).user;
    const { passwordHash, token, ...safe } = user;

    const profileData = {
      ...safe,
      skills: [
        { name: "Data Structures", level: 75 },
        { name: "Algorithms", level: 70 },
        { name: "System Design", level: 55 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Node.js", level: 72 },
      ],
      stats: { problemsSolved: 287, streak: 14, rank: 342 },
    };

    success(res, profileData, "Profile fetched");
  } catch (err) {
    serverError(res);
  }
}

export function updateProfile(req: Request, res: Response) {
  try {
    const user = (req as Request & { user: User }).user;
    const users = readDb<User[]>("users.json", []);
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      notFound(res, "User not found");
      return;
    }

    const allowedFields = ["name", "college", "branch", "graduationYear"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        (users[userIndex] as Record<string, unknown>)[field] = req.body[field];
      }
    });

    writeDb("users.json", users);
    const { passwordHash, token, ...safe } = users[userIndex]!;
    success(res, safe, "Profile updated");
  } catch (err) {
    serverError(res);
  }
}
