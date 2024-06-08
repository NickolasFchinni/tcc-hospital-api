import express from "express";
import { addUser, deleteUser, getUser, updateUser } from "../controllers/users.js";

const router = express.Router()

router.post("/", addUser)

router.get("/", getUser)

router.delete("/:id", deleteUser)

router.put("/:id", updateUser)

export default router