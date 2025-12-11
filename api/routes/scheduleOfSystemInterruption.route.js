import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createSystemInterruption,
  createSystemInterruptionFromCSV,
  deleteSystemInterruption,
  getSystemInterruption,
  getSystemInterruptions,
  updateSystemInterruption,
} from "../controllers/systemInterruption.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scheduleOfSystemInterruptionRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

scheduleOfSystemInterruptionRouter.post(
  "/upload-csv",
  upload.single("file"),
  createSystemInterruptionFromCSV
);

scheduleOfSystemInterruptionRouter.get(
  "/",
  verifyToken,
  getSystemInterruptions
);
scheduleOfSystemInterruptionRouter.get(
  "/:rowId",
  verifyToken,
  getSystemInterruption
);
scheduleOfSystemInterruptionRouter.post(
  "/",
  verifyToken,
  createSystemInterruption
);
scheduleOfSystemInterruptionRouter.put(
  "/:rowId",
  verifyToken,
  updateSystemInterruption
);
scheduleOfSystemInterruptionRouter.delete(
  "/:rowId",
  verifyToken,
  deleteSystemInterruption
);

export default scheduleOfSystemInterruptionRouter;
