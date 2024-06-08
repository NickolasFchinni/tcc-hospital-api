import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/patient.js";

const router = express.Router()

router.get("/",  getUsers) // Aplicando o middleware
router.post("/",  addUser) // Aplicando o middleware
router.put("/:id",  updateUser) // Aplicando o middleware

router.delete("/:id",  deleteUser) // Aplicando o middleware

export default router;
