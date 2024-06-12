import express from "express";
import { addCAviso, getCAviso, getCAvisoById, deleteCAviso } from "../controllers/cAviso.js";

const router = express.Router()

router.get("/", getCAviso)

router.get("/2/:id", getCAvisoById)

router.post("/", addCAviso)

router.delete("/:id", deleteCAviso)



export default router