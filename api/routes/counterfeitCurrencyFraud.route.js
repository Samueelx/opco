import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  getCounterfeitCurrencyFrauds,
  getCounterfeitCurrencyFraud,
  createCounterfeitCurrencyFraud,
  updateCounterfeitCurrencyFraud,
  deleteCounterfeitCurrencyFraud,
  createCounterfeitCurrencyFraudFromCSV,
} from "../controllers/counterfeitCurrencyFraud.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const counterfeitCurrencyFraudRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

counterfeitCurrencyFraudRouter.post(
  "/upload-csv",
  upload.single("file"),
  createCounterfeitCurrencyFraudFromCSV
);

counterfeitCurrencyFraudRouter.get(
  "/",
  verifyToken,
  getCounterfeitCurrencyFrauds
);
counterfeitCurrencyFraudRouter.get(
  "/:reportingDate",
  verifyToken,
  getCounterfeitCurrencyFraud
);
counterfeitCurrencyFraudRouter.post(
  "/",
  verifyToken,
  createCounterfeitCurrencyFraud
);
counterfeitCurrencyFraudRouter.put(
  "/:rowId",
  verifyToken,
  updateCounterfeitCurrencyFraud
);
counterfeitCurrencyFraudRouter.delete(
  "/:rowId",
  verifyToken,
  deleteCounterfeitCurrencyFraud
);

export default counterfeitCurrencyFraudRouter;
