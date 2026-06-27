import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadResume } from "../controllers/resumeController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "uploads"),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

const router = Router();

router.post("/upload", requireAuth, upload.single("resume"), uploadResume);

export default router;
