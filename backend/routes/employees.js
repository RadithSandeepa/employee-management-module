import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createEmployee);

//UPDATE
router.put("/:id", verifyAdmin, updateEmployee);

//DELETE
router.delete("/:id", verifyAdmin, deleteEmployee);

//GET
router.get("/:id", verifyAdmin, getEmployee);

//GET ALL
router.get("/", verifyAdmin, getEmployees);

export default router;