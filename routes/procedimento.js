import express from "express";
import { getProcedimento } from "../controllers/procedimento.js";

const router = express.Router();

router.get("/", getProcedimento);

export default router;
