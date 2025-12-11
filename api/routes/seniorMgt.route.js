import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createSeniorMgt,
  createSeniorMgtFromCSV,
  deleteSeniorMgt,
  getSeniorMgt,
  getSeniorMgts,
  updateSeniorMgt,
} from "../controllers/seniorMgt.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seniorMgtRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

seniorMgtRouter.post(
  "/upload-csv",
  upload.single("file"),
  createSeniorMgtFromCSV
);

seniorMgtRouter.get("/", verifyToken, getSeniorMgts);
seniorMgtRouter.get("/:rowId", verifyToken, getSeniorMgt);
seniorMgtRouter.post("/", verifyToken, createSeniorMgt);
seniorMgtRouter.put("/:rowId", verifyToken, updateSeniorMgt);
seniorMgtRouter.delete("/:rowId", verifyToken, deleteSeniorMgt);

export default seniorMgtRouter;
