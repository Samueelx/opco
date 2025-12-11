import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTrustAccPlacement,
  createTrustAccPlacementFromCSV,
  deleteTrustAccPlacement,
  getTrustAccPlacement,
  getTrustAccPlacements,
  updateTrustAccPlacement,
} from "../controllers/trustAccPlacements.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trustAccPlacementRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

trustAccPlacementRouter.post(
  "/upload-csv",
  upload.single("file"),
  createTrustAccPlacementFromCSV
);

trustAccPlacementRouter.get("/", verifyToken, getTrustAccPlacements);
trustAccPlacementRouter.get("/:reportingDate", verifyToken, getTrustAccPlacement);
trustAccPlacementRouter.post("/", verifyToken, createTrustAccPlacement);
trustAccPlacementRouter.put("/:rowId", verifyToken, updateTrustAccPlacement);
trustAccPlacementRouter.delete("/:rowId", verifyToken, deleteTrustAccPlacement);

export default trustAccPlacementRouter;
