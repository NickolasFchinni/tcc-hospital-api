import express from "express";
import { addWorker, deleteWorker, getWorker, updateWorker, getMedicoWorkers } from "../controllers/worker.js";


const router = express.Router()

router.get("/", getWorker)

router.get("/medicos", getMedicoWorkers);

router.post("/", addWorker)

router.put("/:id", updateWorker)

router.delete("/:id", deleteWorker)

export default router