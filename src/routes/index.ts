import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import dashboardRouter from "./dashboard.js";
import resumeRouter from "./resume.js";
import interviewRouter from "./interview.js";
import dsaRouter from "./dsa.js";
import aptitudeRouter from "./aptitude.js";
import companiesRouter from "./companies.js";
import roadmapRouter from "./roadmap.js";
import plannerRouter from "./planner.js";
import profileRouter from "./profile.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/resume", resumeRouter);
router.use("/interview", interviewRouter);
router.use("/dsa", dsaRouter);
router.use("/aptitude", aptitudeRouter);
router.use("/companies", companiesRouter);
router.use("/roadmap", roadmapRouter);
router.use("/planner", plannerRouter);
router.use("/profile", profileRouter);

export default router;
