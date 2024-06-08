import express from "express";
import { addSala, deleteSala, getSalas } from "../controllers/sala.js";

const router = express.Router()

router.get("/", getSalas)

router.post("/", addSala)

router.delete("/:id", deleteSala)

export default router