import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  getOutletInfos,
  getOutletInfo,
  createOutletInfo,
  updateOutletInfo,
  deleteOutletInfo,
  createOutletInfoFromCSV,
} from "../controllers/outletInformation.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outletInformationRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

outletInformationRouter.post(
  "/upload-csv",
  upload.single("file"),
  createOutletInfoFromCSV
);

outletInformationRouter.get("/", verifyToken, getOutletInfos);
outletInformationRouter.get("/:rowId", verifyToken, getOutletInfo);
outletInformationRouter.post("/", verifyToken, createOutletInfo);
outletInformationRouter.put("/:rowId", verifyToken, updateOutletInfo);
outletInformationRouter.delete("/:rowId", verifyToken, deleteOutletInfo);

export default outletInformationRouter;
