import { Router } from "express";
import { getQuestions, submitAnswer, getAttempts } from "../controllers/interviewController.js";
import { submitInterviewValidator } from "../validators/interviewValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/questions", requireAuth, getQuestions);
router.post("/submit", requireAuth, submitInterviewValidator, validate, submitAnswer);
router.get("/attempts", requireAuth, getAttempts);

export default router;
