import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createShareholder,
  createShareholderFromCSV,
  deleteShareholder,
  getShareholder,
  getShareholders,
  updateShareholder,
} from "../controllers/shareholders.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const shareholdersRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

shareholdersRouter.post(
  "/upload-csv",
  upload.single("file"),
  createShareholderFromCSV
);

shareholdersRouter.get("/", verifyToken, getShareholders);
shareholdersRouter.get("/:rowId", verifyToken, getShareholder);
shareholdersRouter.post("/", verifyToken, createShareholder);
shareholdersRouter.put("/:rowId", verifyToken, updateShareholder);
shareholdersRouter.delete("/:rowId", verifyToken, deleteShareholder);

export default shareholdersRouter;
