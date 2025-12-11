import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTrustee,
  createTrusteeFromCSV,
  deleteTrustee,
  getTrustee,
  getTrustees,
  updateTrustee,
} from "../controllers/trustees.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trusteesRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

trusteesRouter.post("/upload-csv", upload.single("file"), createTrusteeFromCSV);
trusteesRouter.get("/", verifyToken, getTrustees);
trusteesRouter.get("/:rowId", verifyToken, getTrustee);
trusteesRouter.post("/", verifyToken, createTrustee);
trusteesRouter.put("/:rowId", verifyToken, updateTrustee);
trusteesRouter.delete("/:rowId", verifyToken, deleteTrustee);

export default trusteesRouter;
