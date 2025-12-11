import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate, formatDateTime } from "../lib/utils.js";
import { formatDateToIncidentDateFormat, parseAmount } from "../utils/utils.js";

// Get all Cybersecurity Incidents
export const getCybersecurityIncidents = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const cybersecurityIncidents =
      await prisma.cybersecurityIncident.findMany();

    res.status(200).json(cybersecurityIncidents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Cybersecurity Incidents!", error });
  }
};

// Get a Cybersecurity Incident
export const getCybersecurityIncident = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = formatDateToIncidentDateFormat(date)

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const cybersecurityIncident = await prisma.cybersecurityIncident.findMany(
      {
        where: { reportingDate },
      }
    );

    res.status(200).json(cybersecurityIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Cybersecurity Incident!", error });
  }
};

// Create a Cybersecurity Incident
export const createCybersecurityIncident = async (req, res) => {
  const {
    pspId,
    reportingDate,
    // incidentNumber,
    locationOfAttacker,
    incidentMode,
    datetimeOfIncident,
    lossType,
    detailsOfIncident,
    actionTakenToManageIncident,
    datetimeOfIncidentResolution,
    actionTakenToMitigateIncident,
    amountInvolved,
    amountLost,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const noIncidentNumber = incidentMode === "ICDT04" || lossType === "NLSS";

    const newCybersecurityIncident = await prisma.cybersecurityIncident.create({
        data: {
          pspId,
          reportingDate: formatDate(reportingDate),
          incidentNumber: noIncidentNumber ? "NIL" : undefined,
          locationOfAttacker,
          incidentMode,
          datetimeOfIncident,
          lossType,
          detailsOfIncident,
          actionTakenToManageIncident,
          datetimeOfIncidentResolution,
          actionTakenToMitigateIncident,
          amountInvolved: parseAmount(amountInvolved),
          amountLost: parseAmount(amountLost),
        },
      });

    res.status(201).json(newCybersecurityIncident);
  } catch (error) {
    console.log("ERROR:",error)
    res
      .status(500)
      .json({ message: "Failed to create a Cybersecurity Incident!", error });
  }
};

// Update a Cybersecurity Incident
export const updateCybersecurityIncident = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    // incidentNumber,
    locationOfAttacker,
    incidentMode,
    datetimeOfIncident,
    lossType,
    detailsOfIncident,
    actionTakenToManageIncident,
    datetimeOfIncidentResolution,
    actionTakenToMitigateIncident,
    amountInvolved,
    amountLost,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

      const noIncidentNumber = incidentMode === "ICDT04" || lossType === "NLSS";
  
      const updatedCybersecurityIncident = await prisma.cybersecurityIncident.update({
        where: { rowId },
        data: {
          pspId,
          reportingDate: formatDate(reportingDate),
          incidentNumber: noIncidentNumber ? "NIL" : undefined,
          locationOfAttacker,
          incidentMode,
          datetimeOfIncident,
          lossType,
          detailsOfIncident,
          actionTakenToManageIncident,
          datetimeOfIncidentResolution,
          actionTakenToMitigateIncident,
          amountInvolved: parseAmount(amountInvolved),
          amountLost: parseAmount(amountLost),
        },
      });

    res.status(202).json(updatedCybersecurityIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update a Cybersecurity Incident!", error });
  }
};

// Delete a Cybersecurity Incident
export const deleteCybersecurityIncident = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.cybersecurityIncident.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Cybersecurity Incident deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Cybersecurity Incident!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createCybersecurityIncidentFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "cyber" && userTokenUserType !== "superAdmin")
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

          const noIncidentNumber = newSplit[2] === "ICDT04" || newSplit[4] === "NLSS";

          try {
            await prisma.cybersecurityIncident.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                incidentNumber: noIncidentNumber ? "NIL" : undefined,
                incidentMode: newSplit[2],
                datetimeOfIncident: formatDateTime(newSplit[3]),
                lossType: newSplit[4],
                detailsOfIncident: newSplit[5],
                actionTakenToManageIncident: newSplit[6],
                datetimeOfIncidentResolution: formatDateTime(newSplit[7]),
                actionTakenToMitigateIncident: newSplit[8],
                amountInvolved: parseAmount(newSplit[9]),
                amountLost: parseAmount(newSplit[10]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Cyber security Incident entry for row: ${JSON.stringify(
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
