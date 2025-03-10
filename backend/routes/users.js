import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  updatePassword,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

//UPDATE password
router.put("/:id/changepassword", verifyUser, updatePassword);

export default router;