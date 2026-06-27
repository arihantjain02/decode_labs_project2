import { Router } from "express";
import { getCompanies, getCompanyById } from "../controllers/companiesController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getCompanies);
router.get("/:id", requireAuth, getCompanyById);

export default router;
