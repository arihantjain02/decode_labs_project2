import { Router } from "express";
import { getQuestions, submitAnswers } from "../controllers/aptitudeController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/questions", requireAuth, getQuestions);
router.post("/submit", requireAuth, submitAnswers);

export default router;
