import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createDirector,
  createDirectorFromCSV,
  deleteDirector,
  getDirector,
  getDirectors,
  updateDirector,
} from "../controllers/directors.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directorsRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

directorsRouter.post(
  "/upload-csv",
  upload.single("file"),
  createDirectorFromCSV
);
directorsRouter.get("/", verifyToken, getDirectors);
directorsRouter.get("/:rowId", verifyToken, getDirector);
directorsRouter.post("/", verifyToken, createDirector);
directorsRouter.patch("/:rowId", verifyToken, updateDirector);
directorsRouter.delete("/:rowId", verifyToken, deleteDirector);

export default directorsRouter;
