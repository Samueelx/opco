import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createDirectorManagement,
  createDirectorManagementFromCSV,
  deleteDirectorManagement,
  getDirectorManagement,
  getDirectorManagements,
  updateDirectorManagement,
} from "../controllers/directorManagement.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directorManagementRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

directorManagementRouter.post(
  "/upload-csv",
  upload.single("file"),
  createDirectorManagementFromCSV
);
directorManagementRouter.get("/", verifyToken, getDirectorManagements);
directorManagementRouter.get("/:rowId", verifyToken, getDirectorManagement);
directorManagementRouter.post("/", verifyToken, createDirectorManagement);
directorManagementRouter.put("/:rowId", verifyToken, updateDirectorManagement);
directorManagementRouter.delete(
  "/:rowId",
  verifyToken,
  deleteDirectorManagement
);

export default directorManagementRouter;
