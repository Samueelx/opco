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

// Get a System Interruption
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
        let successCount = 0;
        let failCount = 0;

        for (const row of rows) {
          const newSplit = Object.values(row)[0].split(",");

          // Skip the header row to prevent Prisma validation errors
          if (newSplit[0] === "ROW_ID" || newSplit[1] === "PSP_CODE") continue;

          // Helper to convert "None" or empty strings to null for optional fields
          const parseOptional = (val) => (!val || val.trim() === "None" ? null : val.trim());

          try {
            await prisma.systemInterruption.create({
              data: {
                // newSplit[0] is ROW_ID, which we ignore since Prisma auto-generates the _id
                pspId: newSplit[1]?.trim(),
                reportingDate: newSplit[2]?.trim(),
                subCountyCode: newSplit[3]?.trim(),
                systemOwnerFlag: newSplit[4]?.trim(),
                thirdPartyOwnedCategory: parseOptional(newSplit[5]),
                thirdPartyName: parseOptional(newSplit[6]),
                productType: newSplit[7]?.trim(),
                systemUnavailabilityTypeCode: newSplit[8]?.trim(),
                thirdPartySystemAffected: parseOptional(newSplit[9]),
                systemInterruptionCauseCode: newSplit[10]?.trim(),
                severityInterruptionCode: newSplit[11]?.trim(),
                recoveryTimeCode: newSplit[12]?.trim(),
                remedialStatusCode: newSplit[13]?.trim(),
                systemUptime: parseAmount(newSplit[14]),
              },
            });
            successCount++;
          } catch (error) {
            failCount++;
            console.error(
              `Failed to create System Interruption entry for row: ${newSplit[1]}`,
              error.message
            );
          }
        }

        // Return a more accurate response so you know if data actually saved
        if (successCount === 0 && failCount > 0) {
            return res.status(400).json({ message: "All rows failed validation.", failures: failCount });
        }

        res.status(201).json({ 
            message: "CSV processing completed", 
            success: successCount, 
            failures: failCount 
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
  // finally {
  //   deleteFile(filePath); // Remove the file after processing
  // }
};