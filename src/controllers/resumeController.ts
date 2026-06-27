import type { Request, Response } from "express";
import { success, badRequest, serverError } from "../utils/response.js";

function generateAtsAnalysis(filename: string) {
  // Deterministic dummy analysis based on filename length for variety
  const seed = filename.length % 5;
  const baseScore = 70 + seed * 4;

  return {
    atsScore: baseScore,
    filename,
    uploadedAt: new Date().toISOString(),
    sections: {
      contact: { score: 95, feedback: "Contact information is complete and well-formatted." },
      summary: { score: 68 + seed, feedback: "Professional summary could be more tailored to the target role. Use more action verbs." },
      experience: { score: 72 + seed, feedback: "Work experience is well-described. Quantify achievements with numbers where possible." },
      skills: { score: 80 + seed, feedback: "Skills section is solid. Consider adding proficiency levels." },
      education: { score: 90, feedback: "Education section is clear and properly formatted." },
    },
    keywordMatch: {
      matched: ["JavaScript", "React", "Node.js", "TypeScript", "REST API"],
      missing: ["Docker", "Kubernetes", "AWS", "CI/CD", "Agile"],
      matchPercentage: 62,
    },
    suggestions: [
      "Add a compelling professional summary tailored to your target role",
      "Quantify your achievements — use numbers, percentages, and impact metrics",
      "Include more industry keywords relevant to the job description",
      "Add links to GitHub profile and portfolio projects",
      "Ensure consistent formatting and font sizes throughout",
      "Keep resume to one page for less than 5 years of experience",
    ],
  };
}

export function uploadResume(req: Request, res: Response) {
  try {
    if (!req.file) {
      badRequest(res, "No file uploaded. Please upload a PDF file.");
      return;
    }

    const { originalname, size, path: filePath } = req.file;

    if (size > 5 * 1024 * 1024) {
      badRequest(res, "File too large. Maximum size is 5MB.");
      return;
    }

    const analysis = generateAtsAnalysis(originalname);
    success(res, analysis, "Resume analyzed successfully");
  } catch (err) {
    serverError(res);
  }
}
