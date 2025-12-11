import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createFinancialPosition,
  createFinancialPositionFromCSV,
  deleteFinancialPosition,
  getFinancialPosition,
  getFinancialPositions,
  updateFinancialPosition,
} from "../controllers/financialPosition.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const financialPositionRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

financialPositionRouter.post(
  "/upload-csv",
  upload.single("file"),
  createFinancialPositionFromCSV
);

financialPositionRouter.get("/", verifyToken, getFinancialPositions);
financialPositionRouter.get("/:rowId", verifyToken, getFinancialPosition);
financialPositionRouter.post("/", verifyToken, createFinancialPosition);
financialPositionRouter.put("/:rowId", verifyToken, updateFinancialPosition);
financialPositionRouter.delete("/:rowId", verifyToken, deleteFinancialPosition);

export default financialPositionRouter;
