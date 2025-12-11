import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTrustAccount,
  deleteTrustAccount,
  getTrustAccounts,
  getTrustAccount,
  updateTrustAccount,
  createTrustAccountFromCSV,
} from "../controllers/trustAccounts.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trustAccountRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

trustAccountRouter.post(
  "/upload-csv",
  upload.single("file"),
  createTrustAccountFromCSV
);
trustAccountRouter.get("/", verifyToken, getTrustAccounts);
trustAccountRouter.get("/:reportingDate", verifyToken, getTrustAccount);
trustAccountRouter.post("/", verifyToken, createTrustAccount);
trustAccountRouter.put("/:rowId", verifyToken, updateTrustAccount);
trustAccountRouter.delete("/:rowId", verifyToken, deleteTrustAccount);

export default trustAccountRouter;
