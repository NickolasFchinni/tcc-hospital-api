import express from "express";
import { addMateriais, deleteAvisoMaterial } from "../controllers/materiais.js";

const router = express.Router()

router.post("/", addMateriais)

router.delete("/:id", deleteAvisoMaterial)

export default router