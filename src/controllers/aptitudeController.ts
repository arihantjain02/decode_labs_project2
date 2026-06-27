import type { Request, Response } from "express";
import { readDb } from "../utils/fileDb.js";
import { success, badRequest, serverError } from "../utils/response.js";

interface AptitudeData {
  questions: Record<string, { id: string; question: string; options: string[]; answer: number; explanation: string }[]>;
}

export function getQuestions(req: Request, res: Response) {
  try {
    const { category = "quantitative" } = req.query as { category?: string };
    const data = readDb<AptitudeData>("aptitude.json", { questions: {} });
    const questions = data.questions[category.toLowerCase()] ?? data.questions["quantitative"] ?? [];

    // Return questions without answers for the client
    const sanitized = questions.map(({ answer, explanation, ...q }) => q);
    success(res, { category, questions: sanitized }, "Questions fetched");
  } catch (err) {
    serverError(res);
  }
}

export function submitAnswers(req: Request, res: Response) {
  try {
    const { category = "quantitative", answers } = req.body as { category: string; answers: Record<string, number> };

    if (!answers || typeof answers !== "object") {
      badRequest(res, "Answers must be an object mapping questionId to selected option index");
      return;
    }

    const data = readDb<AptitudeData>("aptitude.json", { questions: {} });
    const questions = data.questions[category.toLowerCase()] ?? [];

    let correct = 0;
    const results = questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.answer;
      if (isCorrect) correct++;
      return { id: q.id, question: q.question, selected, correctAnswer: q.answer, isCorrect, explanation: q.explanation };
    });

    const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

    success(res, {
      category,
      score,
      correct,
      total: questions.length,
      percentage: `${score}%`,
      results,
    }, "Aptitude test evaluated");
  } catch (err) {
    serverError(res);
  }
}
