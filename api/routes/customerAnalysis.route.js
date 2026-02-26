import express from "express";
import {
  createCustomerAnalysis,
  getCustomerAnalysis,
} from "../controllers/customerAnalysis.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createCustomerAnalysis);
router.get("/", verifyToken, getCustomerAnalysis);

export default router;
