import express from "express";
import { addCAviso, getCAviso } from "../controllers/cAviso.js";

const router = express.Router()

router.get("/", getCAviso)

router.post("/", addCAviso)

export default router