import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { profileValidator } from "../validators/profileValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, profileValidator, validate, updateProfile);

export default router;
