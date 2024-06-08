import express from "express";
import { getEspecialidade } from "../controllers/especialidade.js";


const router = express.Router()

router.get("/", getEspecialidade)

export default router