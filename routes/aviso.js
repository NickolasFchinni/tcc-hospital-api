import express from "express";
import { addAviso, deleteAviso, getAvisos } from "../controllers/aviso.js";

const router = express.Router()

router.get("/", getAvisos)


router.post("/", addAviso)

router.delete("/:id", deleteAviso)

export default router