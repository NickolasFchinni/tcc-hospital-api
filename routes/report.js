import express from "express";
import { getFirstReport, getSecondReport, getThirdReport, getFourthReport } from "../controllers/report.js";

const router = express.Router();

router.get("/first", getFirstReport);
router.get("/second", getSecondReport);
router.get("/third", getThirdReport);
router.get("/fourth", getFourthReport);

export default router;