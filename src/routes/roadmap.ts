import { Router } from "express";
import { generateRoadmap, getRoadmaps } from "../controllers/roadmapController.js";
import { roadmapValidator } from "../validators/roadmapValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getRoadmaps);
router.post("/generate", requireAuth, roadmapValidator, validate, generateRoadmap);

export default router;
