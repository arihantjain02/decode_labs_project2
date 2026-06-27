import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, serverError } from "../utils/response.js";

interface Milestone {
  week: number;
  title: string;
  tasks: string[];
  completed: boolean;
}

interface Roadmap {
  id: string;
  targetCompany: string;
  currentLevel: string;
  weeks: number;
  milestones: Milestone[];
  createdAt: string;
}

function generateMilestones(targetCompany: string, currentLevel: string, weeks: number): Milestone[] {
  const isAdvanced = currentLevel === "advanced";
  const isBeginner = currentLevel === "beginner";

  const phases = [
    {
      title: "Foundation — Core DSA",
      tasks: isBeginner
        ? ["Arrays & Strings basics", "Time/Space complexity", "Basic sorting algorithms", "Linear search & Binary search"]
        : ["Refresh arrays, strings, and sorting", "Practice 10 easy LeetCode problems", "Review recursion basics"],
    },
    {
      title: "Intermediate — Trees & Graphs",
      tasks: ["Binary trees and BST", "Graph traversal (BFS, DFS)", "Shortest path algorithms", "Practice 15 medium problems"],
    },
    {
      title: "Advanced — Dynamic Programming",
      tasks: ["DP fundamentals and memoization", "Classic DP patterns (knapsack, LCS)", "2D DP problems", "Practice 10 hard DP problems"],
    },
    {
      title: `${targetCompany}-Specific Prep`,
      tasks: [`Study ${targetCompany} interview patterns`, "Mock interviews with time constraints", "Review company-specific LeetCode list", "Behavioral question prep (STAR method)"],
    },
    {
      title: "Mock Interviews & Review",
      tasks: ["Full mock interviews (90 min sessions)", "Identify and fix weak areas", "Review all previous problems", "System design practice for senior roles"],
    },
    {
      title: "Final Sprint",
      tasks: ["LeetCode contest participation", "Review notes and flashcards", "Rest and mental preparation", "Logistics and interview day prep"],
    },
  ];

  return Array.from({ length: weeks }, (_, i) => {
    const phaseIndex = Math.min(Math.floor((i / weeks) * phases.length), phases.length - 1);
    const phase = phases[phaseIndex]!;
    return {
      week: i + 1,
      title: i === 0 ? phase.title : i === weeks - 1 ? "Final Sprint & Review" : `Week ${i + 1} — ${phase.title}`,
      tasks: phase.tasks,
      completed: false,
    };
  });
}

export function generateRoadmap(req: Request, res: Response) {
  try {
    const { targetCompany, currentLevel, weeks } = req.body;
    const roadmaps = readDb<Roadmap[]>("roadmap.json", []);

    const roadmap: Roadmap = {
      id: uuidv4(),
      targetCompany,
      currentLevel,
      weeks: Number(weeks),
      milestones: generateMilestones(targetCompany, currentLevel, Number(weeks)),
      createdAt: new Date().toISOString(),
    };

    roadmaps.push(roadmap);
    writeDb("roadmap.json", roadmaps);

    success(res, roadmap, "Roadmap generated successfully");
  } catch (err) {
    serverError(res);
  }
}

export function getRoadmaps(req: Request, res: Response) {
  try {
    const roadmaps = readDb<Roadmap[]>("roadmap.json", []);
    success(res, roadmaps.slice(-5).reverse(), "Roadmaps fetched");
  } catch (err) {
    serverError(res);
  }
}
