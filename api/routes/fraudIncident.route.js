import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createFraudIncident,
  createFraudIncidentFromCSV,
  deleteFraudIncident,
  getFraudIncident,
  getFraudIncidentByDate,
  getFraudIncidents,
  updateFraudIncident,
} from "../controllers/fraudIncidents.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fraudIncidentRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

fraudIncidentRouter.post(
  "/upload-csv",
  upload.single("file"),
  createFraudIncidentFromCSV
);

fraudIncidentRouter.get("/", verifyToken, getFraudIncidents);
fraudIncidentRouter.get("/:rowId", verifyToken, getFraudIncident);
fraudIncidentRouter.get("/reportingdate/:reportingDate", verifyToken, getFraudIncidentByDate);
fraudIncidentRouter.post("/", verifyToken, createFraudIncident);
fraudIncidentRouter.put("/:rowId", verifyToken, updateFraudIncident);
fraudIncidentRouter.delete("/:rowId", verifyToken, deleteFraudIncident);

export default fraudIncidentRouter;
