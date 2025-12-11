import express from "express";
import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCustomerComplaint,
  createCustomerComplaintFromCSV,
  deleteCustomerComplaint,
  getCustomerComplaint,
  getCustomerComplaints,
  getUniqueReportingDates,
  updateCustomerComplaint,
} from "../controllers/customercomplaints.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scheduleOfCustomerComplaintRouter = express.Router();

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ dest: uploadDirectory });

scheduleOfCustomerComplaintRouter.post(
  "/upload-csv",
  upload.single("file"),
  createCustomerComplaintFromCSV
);

scheduleOfCustomerComplaintRouter.get("/", verifyToken, getCustomerComplaints);
scheduleOfCustomerComplaintRouter.get("/unique-reporting-dates", verifyToken, getUniqueReportingDates);
scheduleOfCustomerComplaintRouter.get(
  "/:reportingDate",
  verifyToken,
  getCustomerComplaint
);
scheduleOfCustomerComplaintRouter.post(
  "/",
  verifyToken,
  createCustomerComplaint
);
scheduleOfCustomerComplaintRouter.put(
  "/:rowId",
  verifyToken,
  updateCustomerComplaint
);
scheduleOfCustomerComplaintRouter.delete(
  "/:rowId",
  verifyToken,
  deleteCustomerComplaint
);

export default scheduleOfCustomerComplaintRouter;
