import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createShareholderInfo,
  createShareholderInfoFromCSV,
  deleteShareholderInfo,
  getShareholderInfo,
  getShareholderInfos,
  updateShareholderInfo,
} from "../controllers/shareholderInfo.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const shareholderInfoRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

shareholderInfoRouter.post(
  "/upload-csv",
  upload.single("file"),
  createShareholderInfoFromCSV
);

shareholderInfoRouter.get("/",verifyToken, getShareholderInfos);
shareholderInfoRouter.get("/:rowId", verifyToken, getShareholderInfo);
shareholderInfoRouter.post("/", verifyToken, createShareholderInfo);
shareholderInfoRouter.put("/:rowId", verifyToken, updateShareholderInfo);
shareholderInfoRouter.delete("/:rowId", verifyToken, deleteShareholderInfo);

export default shareholderInfoRouter;
