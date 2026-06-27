import { Router } from "express";
import { getDsa, getTopics, updateProgress } from "../controllers/dsaController.js";
import { dsaUpdateValidator } from "../validators/dsaValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getDsa);
router.get("/topics", requireAuth, getTopics);
router.post("/update", requireAuth, dsaUpdateValidator, validate, updateProgress);

export default router;
