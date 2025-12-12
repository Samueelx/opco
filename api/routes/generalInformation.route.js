import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createGeneralInformation,
  createGeneralInformationFromCSV,
  deleteGeneralInformation,
  getGeneralInformation,
  getGeneralInformationRecords,
  updateGeneralInformation,
} from "../controllers/generalInformation.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generalInformationRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

generalInformationRouter.post(
  "/upload-csv",
  upload.single("file"),
  createGeneralInformationFromCSV
);

generalInformationRouter.get("/", verifyToken, getGeneralInformationRecords);

generalInformationRouter.get(
  "/:reportingDate",
  verifyToken,
  getGeneralInformation
);

generalInformationRouter.post("/", verifyToken, createGeneralInformation);

generalInformationRouter.put(
  "/:rowId",
  verifyToken,
  updateGeneralInformation
);

generalInformationRouter.delete(
  "/:rowId",
  verifyToken,
  deleteGeneralInformation
);

export default generalInformationRouter;