import type { Request, Response } from "express";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, notFound, serverError } from "../utils/response.js";

interface DsaData {
  topics: { name: string; solved: number; total: number; difficulty: string }[];
  heatmap: number[][];
  streak: number;
  totalSolved: number;
  totalProblems: number;
}

export function getDsa(req: Request, res: Response) {
  try {
    const data = readDb<DsaData>("dsa.json", { topics: [], heatmap: [], streak: 0, totalSolved: 0, totalProblems: 0 });
    success(res, data, "DSA data fetched");
  } catch (err) {
    serverError(res);
  }
}

export function getTopics(req: Request, res: Response) {
  try {
    const { difficulty } = req.query as { difficulty?: string };
    const data = readDb<DsaData>("dsa.json", { topics: [], heatmap: [], streak: 0, totalSolved: 0, totalProblems: 0 });
    const topics = difficulty ? data.topics.filter((t) => t.difficulty.toLowerCase() === difficulty.toLowerCase()) : data.topics;
    success(res, topics, "Topics fetched");
  } catch (err) {
    serverError(res);
  }
}

export function updateProgress(req: Request, res: Response) {
  try {
    const { topic, solved } = req.body;
    const data = readDb<DsaData>("dsa.json", { topics: [], heatmap: [], streak: 0, totalSolved: 0, totalProblems: 0 });
    const topicEntry = data.topics.find((t) => t.name.toLowerCase() === topic.toLowerCase());

    if (!topicEntry) {
      notFound(res, `Topic '${topic}' not found`);
      return;
    }

    topicEntry.solved = Math.min(solved, topicEntry.total);
    data.totalSolved = data.topics.reduce((sum, t) => sum + t.solved, 0);
    writeDb("dsa.json", data);

    success(res, topicEntry, "Progress updated");
  } catch (err) {
    serverError(res);
  }
}
