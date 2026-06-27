import type { Request, Response } from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, created, badRequest, unauthorized, serverError } from "../utils/response.js";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  college: string;
  branch: string;
  graduationYear: number;
  token: string;
  createdAt: string;
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function sanitizeUser(user: User) {
  const { passwordHash, ...safe } = user;
  return safe;
}

export function signup(req: Request, res: Response) {
  try {
    const { name, email, password, college, branch, graduationYear } = req.body;
    const users = readDb<User[]>("users.json", []);

    if (users.find((u) => u.email === email)) {
      badRequest(res, "Email already registered");
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      passwordHash: hashPassword(password),
      college: college || "",
      branch: branch || "",
      graduationYear: graduationYear || 2025,
      token: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeDb("users.json", users);

    created(res, { token: newUser.token, user: sanitizeUser(newUser) }, "Account created successfully");
  } catch (err) {
    serverError(res);
  }
}

export function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const users = readDb<User[]>("users.json", []);
    const user = users.find((u) => u.email === email);

    if (!user || user.passwordHash !== hashPassword(password)) {
      unauthorized(res, "Invalid email or password");
      return;
    }

    // Refresh token on every login
    user.token = uuidv4();
    writeDb("users.json", users);

    success(res, { token: user.token, user: sanitizeUser(user) }, "Login successful");
  } catch (err) {
    serverError(res);
  }
}

export function getProfile(req: Request, res: Response) {
  try {
    const user = (req as Request & { user: User }).user;
    success(res, sanitizeUser(user), "Profile fetched");
  } catch (err) {
    serverError(res);
  }
}
