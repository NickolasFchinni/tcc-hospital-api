import express from "express";
import { getCompatibleMaterials } from "../controllers/mat_compativel.js";

const router = express.Router();

router.get("/", getCompatibleMaterials);

export default router;