import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all System Interruptions
export const getSystemInterruptions = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const systemInterruptions = await prisma.systemInterruption.findMany();

    res.status(200).json(systemInterruptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch System Interruptions!", error });
  }
};

// Get a System Interruptions
export const getSystemInterruption = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const systemInterruption = await prisma.systemInterruption.findUnique({
      where: { rowId },
    });

    res.status(200).json(systemInterruption);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch System Interruption!", error });
  }
};

// Create a System Interruption
export const createSystemInterruption = async (req, res) => {
  const {
    pspId,
    reportingDate,
    subCountyCode,
    systemOwnerFlag,
    thirdPartyOwnedCategory,
    thirdPartyName,
    productType,
    systemUnavailabilityTypeCode,
    thirdPartySystemAffected,
    systemInterruptionCauseCode,
    severityInterruptionCode,
    recoveryTimeCode,
    remedialStatusCode,
    systemUptime,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const systemInterruption = await prisma.systemInterruption.create({
      data: {
        pspId,
        reportingDate,
        subCountyCode,
        systemOwnerFlag,
        thirdPartyOwnedCategory,
        thirdPartyName,
        productType,
        systemUnavailabilityTypeCode,
        thirdPartySystemAffected,
        systemInterruptionCauseCode,
        severityInterruptionCode,
        recoveryTimeCode,
        remedialStatusCode,
        systemUptime: parseAmount(systemUptime),
      },
    });

    res.status(201).json(systemInterruption);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create System Interruption!", error });
  }
};

// Update a System Interruption
export const updateSystemInterruption = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    subCountyCode,
    systemOwnerFlag,
    thirdPartyOwnedCategory,
    thirdPartyName,
    productType,
    systemUnavailabilityTypeCode,
    thirdPartySystemAffected,
    systemInterruptionCauseCode,
    severityInterruptionCode,
    recoveryTimeCode,
    remedialStatusCode,
    systemUptime,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedSystemInterruption = await prisma.systemInterruption.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        subCountyCode,
        systemOwnerFlag,
        thirdPartyOwnedCategory,
        thirdPartyName,
        productType,
        systemUnavailabilityTypeCode,
        thirdPartySystemAffected,
        systemInterruptionCauseCode,
        severityInterruptionCode,
        recoveryTimeCode,
        remedialStatusCode,
        systemUptime: parseAmount(systemUptime),
      },
    });

    res.status(202).json({
      message: "System Interruption updated successfully!",
      updatedSystemInterruption,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update System Interruption!", error });
  }
};

// Delete a System Interruption
export const deleteSystemInterruption = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.systemInterruption.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "System Interruption deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete System Interruption!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createSystemInterruptionFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "nps" && userTokenUserType !== "superAdmin")
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
            await prisma.systemInterruption.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                subCountyCode: newSplit[2],
                systemOwnerFlag: newSplit[3],
                thirdPartyOwnedCategory: newSplit[4],
                thirdPartyName: newSplit[5],
                productType: newSplit[6],
                systemUnavailabilityTypeCode: newSplit[7],
                thirdPartySystemAffected: newSplit[8],
                systemInterruptionCauseCode: newSplit[9],
                severityInterruptionCode: newSplit[10],
                recoveryTimeCode: newSplit[11],
                remedialStatusCode: newSplit[12],
                systemUptime: parseAmount(newSplit[13]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a System Interruption entry for row: ${JSON.stringify(
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
