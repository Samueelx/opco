import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createForeignExchangePosition,
  createForeignExchangePositionFromCSV,
  deleteForeignExchangePosition,
  getForeignExchangePosition,
  getForeignExchangePositions,
  updateForeignExchangePosition,
} from "../controllers/exchangeRatePosition.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const exchangeRatePositionRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

exchangeRatePositionRouter.post(
  "/upload-csv",
  upload.single("file"),
  createForeignExchangePositionFromCSV
);

exchangeRatePositionRouter.get("/", verifyToken, getForeignExchangePositions);
exchangeRatePositionRouter.get(
  "/:rowId",
  verifyToken,
  getForeignExchangePosition
);
exchangeRatePositionRouter.post(
  "/",
  verifyToken,
  createForeignExchangePosition
);
exchangeRatePositionRouter.put(
  "/:rowId",
  verifyToken,
  updateForeignExchangePosition
);
exchangeRatePositionRouter.delete(
  "/:rowId",
  verifyToken,
  deleteForeignExchangePosition
);

export default exchangeRatePositionRouter;
