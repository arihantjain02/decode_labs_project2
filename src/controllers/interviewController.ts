import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, badRequest, serverError } from "../utils/response.js";

interface InterviewData {
  questions: Record<string, Record<string, { id: string; title: string; description: string; tags: string[] }[]>>;
  attempts: Attempt[];
}

interface Attempt {
  id: string;
  questionId: string;
  company: string;
  difficulty: string;
  answer: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  submittedAt: string;
}

function generateFeedback(answer: string, difficulty: string) {
  const wordCount = answer.split(" ").length;
  const baseScore = difficulty === "easy" ? 75 : difficulty === "medium" ? 65 : 55;
  const score = Math.min(100, baseScore + Math.floor(wordCount / 5));

  return {
    score,
    feedback: `Your answer demonstrates ${score >= 80 ? "strong" : score >= 65 ? "good" : "basic"} understanding of the concept. ${wordCount > 50 ? "Well-elaborated response." : "Consider providing more detail."}`,
    strengths: [
      "Clear problem identification",
      wordCount > 30 ? "Detailed explanation provided" : "Concise answer",
      "Logical approach to the problem",
    ],
    improvements: [
      wordCount < 30 ? "Elaborate more on your thought process" : "Consider discussing time/space complexity",
      "Add edge cases and boundary conditions",
      "Mention alternative approaches",
    ],
  };
}

export function getQuestions(req: Request, res: Response) {
  try {
    const { company = "google", difficulty = "medium" } = req.query as { company?: string; difficulty?: string };
    const data = readDb<InterviewData>("interviews.json", { questions: {}, attempts: [] });
    const companyQuestions = data.questions[company.toLowerCase()] ?? data.questions["google"] ?? {};
    const questions = companyQuestions[difficulty.toLowerCase()] ?? companyQuestions["medium"] ?? [];

    success(res, { company, difficulty, questions }, "Questions fetched");
  } catch (err) {
    serverError(res);
  }
}

export function submitAnswer(req: Request, res: Response) {
  try {
    const { questionId, company, difficulty = "medium", answer } = req.body;
    const data = readDb<InterviewData>("interviews.json", { questions: {}, attempts: [] });
    const { score, feedback, strengths, improvements } = generateFeedback(answer, difficulty);

    const attempt: Attempt = {
      id: uuidv4(),
      questionId,
      company,
      difficulty,
      answer,
      score,
      feedback,
      strengths,
      improvements,
      submittedAt: new Date().toISOString(),
    };

    data.attempts.push(attempt);
    writeDb("interviews.json", data);

    success(res, attempt, "Answer submitted and feedback generated");
  } catch (err) {
    serverError(res);
  }
}

export function getAttempts(req: Request, res: Response) {
  try {
    const data = readDb<InterviewData>("interviews.json", { questions: {}, attempts: [] });
    success(res, data.attempts.slice(-10).reverse(), "Interview history fetched");
  } catch (err) {
    serverError(res);
  }
}
