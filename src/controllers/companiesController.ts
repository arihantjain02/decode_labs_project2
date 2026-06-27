import type { Request, Response } from "express";
import { readDb } from "../utils/fileDb.js";
import { success, notFound, serverError } from "../utils/response.js";

interface Company {
  id: string;
  name: string;
  logo: string;
  package: string;
  difficulty: string;
  openRoles: string[];
  rounds: string[];
  topics: string[];
  tips: string[];
}

export function getCompanies(req: Request, res: Response) {
  try {
    const companies = readDb<Company[]>("companies.json", []);
    // Return summary (no rounds/tips) in list view
    const summary = companies.map(({ id, name, logo, package: pkg, difficulty, openRoles }) => ({
      id, name, logo, package: pkg, difficulty, openRoles,
    }));
    success(res, summary, "Companies fetched");
  } catch (err) {
    serverError(res);
  }
}

export function getCompanyById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const companies = readDb<Company[]>("companies.json", []);
    const company = companies.find((c) => c.id === id.toLowerCase());

    if (!company) {
      notFound(res, `Company '${id}' not found`);
      return;
    }

    success(res, company, "Company details fetched");
  } catch (err) {
    serverError(res);
  }
}
