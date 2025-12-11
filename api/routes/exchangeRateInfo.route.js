import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createExchangeRateInfo,
  createExchangeRateInfoFromCSV,
  deleteExchangeRateInfo,
  getExchangeRateInfo,
  getExchangeRateInfos,
  updateExchangeRateInfo,
} from "../controllers/exchangeRateInfo.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const exchangeRateInfoRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

exchangeRateInfoRouter.post(
  "/upload-csv",
  upload.single("file"),
  createExchangeRateInfoFromCSV
);

exchangeRateInfoRouter.get("/", verifyToken, getExchangeRateInfos);
exchangeRateInfoRouter.get("/:rowId", verifyToken, getExchangeRateInfo);
exchangeRateInfoRouter.post("/", verifyToken, createExchangeRateInfo);
exchangeRateInfoRouter.put("/:rowId", verifyToken, updateExchangeRateInfo);
exchangeRateInfoRouter.delete("/:rowId", verifyToken, deleteExchangeRateInfo);

export default exchangeRateInfoRouter;
