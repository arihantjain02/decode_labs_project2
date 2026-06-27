import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/plannerController.js";
import { plannerValidator, plannerUpdateValidator } from "../validators/plannerValidator.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getTasks);
router.post("/", requireAuth, plannerValidator, validate, createTask);
router.put("/:id", requireAuth, plannerUpdateValidator, validate, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;
