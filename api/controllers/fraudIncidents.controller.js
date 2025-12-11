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

export const createFraudIncidentFromCSV = async (req, res) => {
  const filePath = path.resolve(req.file.path);
  const token = req.cookies?.token;

  console.log(`File path: ${filePath}`); // Debugging line to log file path

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return res.status(400).json({ message: "File not found!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: "\n" }))
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        for (const row of rows) {
          const newSplit = Object.values(row)[0].split(",");

          try {
            await prisma.fraudIncident.create({
              data: {
                pspId: newSplit[0],
                reportingDate: formatDate(newSplit[1]),
                subCountyCode: newSplit[2],
                subFraudCode: newSplit[3],
                fraudCategoryFlag: newSplit[4],
                victimCategory: newSplit[5],
                victimInfo: newSplit[6],
                dateOfOccurence: formatDate(newSplit[7]),
                numberOfIncidents: parseInt(newSplit[8]),
                amountInvolved: parseAmount(newSplit[9]),
                amountLost: parseAmount(newSplit[10]),
                amountRecovered: parseAmount(newSplit[11]),
                actionTaken: newSplit[12],
                recoveryDetails: newSplit[13],
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Fraud Incident entry for row: ${JSON.stringify(
                row
              )}`,
              error
            );
          }
        }

        res.status(201).json({ message: "CSV file processed successfully" });
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).json({ message: "Error reading CSV file", error });
      });
  } catch (error) {
    console.error("Failed to process the CSV file:", error); // Enhanced error logging
    res.status(500).json({
      message: "Failed to process the CSV file!",
      error,
    });
  }
  // finally {
  //   deleteFile(filePath); // Remove the file after processing
  // }
};
