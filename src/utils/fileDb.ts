import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export function readDb<T>(filename: string, defaultValue: T): T {
  const filePath = path.join(dataDir, filename);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function writeDb<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
