import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";
import { formatDateToIncidentDateFormat, parseAmount } from "../utils/utils.js";

// Get all Fraud Incidents
export const getFraudIncidents = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const fraudIncidents = await prisma.fraudIncident.findMany();

    res.status(200).json(fraudIncidents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Fraud Incidents!", error });
  }
};

// Get a Fraud Incident
export const getFraudIncident = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const fraudIncident = await prisma.fraudIncident.findUnique({
      where: { rowId },
    });

    res.status(200).json(fraudIncident);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Fraud Incident!", error });
  }
};

// Get a Fraud Incident by Reporting Date
export const getFraudIncidentByDate = async (req, res) => {
  const reportingDate = req.params.reportingDate;
  const token = req.cookies?.token;

  const formattedDate = formatDateToIncidentDateFormat(reportingDate)

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const fraudIncident = await prisma.fraudIncident.findMany({
      where: { reportingDate: formattedDate },
    });

    res.status(200).json(fraudIncident);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Fraud Incident! ase", error });
  }
};

// Create a Fraud Incident
export const createFraudIncident = async (req, res) => {
  const {
    pspId,
    reportingDate,
    subCountyCode,
    subFraudCode,
    fraudCategoryFlag,
    victimCategory,
    victimInfo,
    dateOfOccurence,
    numberOfIncidents,
    amountInvolved,
    amountLost,
    amountRecovered,
    actionTaken,
    recoveryDetails,
  } = req.body;
  const token = req.cookies?.token;


  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newFraudIncident = await prisma.fraudIncident.create({
      data: {
        pspId,
        reportingDate:formatDate(reportingDate),
        subCountyCode,
        subFraudCode,
        fraudCategoryFlag,
        victimCategory,
        victimInfo,
        dateOfOccurence: formatDate(dateOfOccurence),
        numberOfIncidents: parseInt(numberOfIncidents),
        amountInvolved: parseAmount(amountInvolved),
        amountLost: parseAmount(amountLost),
        amountRecovered: parseAmount(amountRecovered),
        actionTaken,
        recoveryDetails,
      },
    });

    res.status(201).json(newFraudIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a Fraud Incident!", error });
  }
};

// Update a Fraud Incident
export const updateFraudIncident = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    subCountyCode,
    subFraudCode,
    fraudCategoryFlag,
    victimCategory,
    victimInfo,
    dateOfOccurence,
    numberOfIncidents,
    amountInvolved,
    amountLost,
    amountRecovered,
    actionTaken,
    recoveryDetails,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedFraudIncident = await prisma.fraudIncident.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        subCountyCode,
        subFraudCode,
        fraudCategoryFlag,
        victimCategory,
        victimInfo,
        dateOfOccurence:formatDate(dateOfOccurence),
        numberOfIncidents: parseInt(numberOfIncidents),
        amountInvolved: parseAmount(amountInvolved),
        amountLost: parseAmount(amountLost),
        amountRecovered: parseAmount(amountRecovered),
        actionTaken,
        recoveryDetails,
      },
    });

    res.status(202).json(updatedFraudIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update a Fraud Incident!", error });
  }
};

// Delete a Fraud Incident
export const deleteFraudIncident = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.fraudIncident.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Fraud Incident deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Fraud Incident!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

// Parses dates in DD-Mon-YY format (e.g. "14-Dec-25") → "14-Dec-2025"
const parseIncidentDate = (value) => {
  if (!value) return "";
  const trimmed = value.trim();
  // Already in DD-Mon-YY or DD-Mon-YYYY format
  const match = trimmed.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/);
  if (match) {
    const [, day, mon, yr] = match;
    const year = yr.length === 2 ? `20${yr}` : yr;
    return `${day}-${mon}-${year}`;
  }
  // Fall back to formatDate for YYYY-MM-DD inputs
  return formatDate(trimmed);
};

// Parses amounts that may be quoted, spaced, or contain dashes (e.g. " 149,500.00 ", " -   ")
const parseIncidentAmount = (value) => {
  if (!value) return 0;
  const trimmed = value.trim().replace(/"/g, "").trim();
  if (trimmed === "-" || trimmed === "" || /^-\s*$/.test(trimmed)) return 0;
  return parseFloat(trimmed.replace(/,/g, "")) || 0;
};

export const createFraudIncidentFromCSV = async (req, res) => {
  const filePath = path.resolve(req.file.path);
  const token = req.cookies?.token;

  console.log(`File path: ${filePath}`);

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return res.status(400).json({ message: "File not found!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const results = [];
    const errors = [];
    const createdRecords = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          // Use proper comma-separated parsing so quoted fields (e.g. " 149,500.00 ") are kept intact
          mapHeaders: ({ header }) => header.trim(),
        })
      )
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        for (const row of results) {
          // CSV columns: Row ID | PSP ID | Report date | Sub county code | Sub fraud code |
          //              Fraud category flag | Victim category | Victim information |
          //              Date of occurrence | Number of incidences | Amount involved |
          //              Amount lost | Amount recovered | Action taken | Recovery details | Comment
          const values = Object.values(row);

          // Skip header-only rows or empty rows
          if (!values[1] || values[1].trim() === "PSP ID") continue;

          try {
            const created = await prisma.fraudIncident.create({
              data: {
                pspId: (values[1] ?? "").trim(),
                reportingDate: parseIncidentDate(values[2]),
                subCountyCode: (values[3] ?? "").trim(),
                subFraudCode: (values[4] ?? "").trim(),
                fraudCategoryFlag: (values[5] ?? "").trim(),
                victimCategory: (values[6] ?? "").trim(),
                victimInfo: (values[7] ?? "").trim(),
                dateOfOccurence: parseIncidentDate(values[8]),
                numberOfIncidents: parseInt(values[9]) || 0,
                amountInvolved: parseIncidentAmount(values[10]),
                amountLost: parseIncidentAmount(values[11]),
                amountRecovered: parseIncidentAmount(values[12]),
                actionTaken: (values[13] ?? "").trim(),
                recoveryDetails: (values[14] ?? "").trim(),
              },
            });
            createdRecords.push(created);
          } catch (error) {
            console.error(
              `Failed to create a Fraud Incident entry for row: ${JSON.stringify(row)}`,
              error
            );
            errors.push({ row, error: error.message });
          }
        }

        if (errors.length > 0) {
          return res.status(207).json({
            message: `CSV processed with ${errors.length} error(s). ${createdRecords.length} record(s) imported successfully.`,
            importedRecords: createdRecords,
            errors,
          });
        }

        res.status(201).json({
          message: `CSV file processed successfully. ${createdRecords.length} record(s) imported.`,
          importedRecords: createdRecords,
        });
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).json({ message: "Error reading CSV file", error });
      });
  } catch (error) {
    console.error("Failed to process the CSV file:", error);
    res.status(500).json({
      message: "Failed to process the CSV file!",
      error,
    });
  }
};
