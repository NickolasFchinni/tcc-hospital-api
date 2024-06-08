import express from "express";
import { addRoom, getRooms, deleteRoom } from "../controllers/room.js";

const router = express.Router()

router.get("/", getRooms)

router.post("/", addRoom)

router.delete("/:id", deleteRoom)

export default router