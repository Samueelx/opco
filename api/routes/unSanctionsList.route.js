import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createUNSanctionsList,
  createUNSanctionsListFromCSV,
  deleteUNSanctionsList,
  getUNSanctionsList,
  getUNSanctionsListRecords,
  updateUNSanctionsList,
} from "../controllers/unSanctionsList.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const unSanctionsListRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

unSanctionsListRouter.post(
  "/upload-csv",
  upload.single("file"),
  createUNSanctionsListFromCSV
);

unSanctionsListRouter.get("/", verifyToken, getUNSanctionsListRecords);

unSanctionsListRouter.get(
  "/:reportingDate",
  verifyToken,
  getUNSanctionsList
);

unSanctionsListRouter.post("/", verifyToken, createUNSanctionsList);

unSanctionsListRouter.put(
  "/:rowId",
  verifyToken,
  updateUNSanctionsList
);

unSanctionsListRouter.delete(
  "/:rowId",
  verifyToken,
  deleteUNSanctionsList
);

export default unSanctionsListRouter;