import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createSuspiciousTransaction,
  createSuspiciousTransactionFromCSV,
  deleteSuspiciousTransaction,
  getSuspiciousTransaction,
  getSuspiciousTransactions,
  updateSuspiciousTransaction,
} from "../controllers/suspiciousTransactions.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const suspiciousTransactionsRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

suspiciousTransactionsRouter.post(
  "/upload-csv",
  upload.single("file"),
  createSuspiciousTransactionFromCSV
);

suspiciousTransactionsRouter.get("/", verifyToken, getSuspiciousTransactions);

suspiciousTransactionsRouter.get(
  "/:reportingDate",
  verifyToken,
  getSuspiciousTransaction
);

suspiciousTransactionsRouter.post("/", verifyToken, createSuspiciousTransaction);

suspiciousTransactionsRouter.put(
  "/:rowId",
  verifyToken,
  updateSuspiciousTransaction
);

suspiciousTransactionsRouter.delete(
  "/:rowId",
  verifyToken,
  deleteSuspiciousTransaction
);

export default suspiciousTransactionsRouter;