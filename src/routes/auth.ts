import { Router } from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { signupValidator, loginValidator } from "../validators/authValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get("/profile", requireAuth, getProfile);

export default router;
