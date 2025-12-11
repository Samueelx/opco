import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCybersecurityIncident,
  createCybersecurityIncidentFromCSV,
  deleteCybersecurityIncident,
  getCybersecurityIncident,
  getCybersecurityIncidents,
  updateCybersecurityIncident,
} from "../controllers/cybersecurityIncidents.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cybersecurityIncidentRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

cybersecurityIncidentRouter.post(
  "/upload-csv",
  upload.single("file"),
  createCybersecurityIncidentFromCSV
);
cybersecurityIncidentRouter.get("/", verifyToken, getCybersecurityIncidents);
cybersecurityIncidentRouter.get(
  "/:reportingDate",
  verifyToken,
  getCybersecurityIncident
);
cybersecurityIncidentRouter.post("/", verifyToken, createCybersecurityIncident);
cybersecurityIncidentRouter.put(
  "/:rowId",
  verifyToken,
  updateCybersecurityIncident
);
cybersecurityIncidentRouter.delete(
  "/:rowId",
  verifyToken,
  deleteCybersecurityIncident
);

export default cybersecurityIncidentRouter;
