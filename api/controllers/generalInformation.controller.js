import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";
import { formatDateToIncidentDateFormat } from "../utils/utils.js";

// Get all General Information records
export const getGeneralInformationRecords = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const generalInformation = await prisma.generalInformation.findMany();

    res.status(200).json(generalInformation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch General Information records!", error });
  }
};

// Get General Information by Reporting Date
export const getGeneralInformation = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = formatDateToIncidentDateFormat(date);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const generalInformation = await prisma.generalInformation.findMany({
      where: { reportingDate },
    });

    res.status(200).json(generalInformation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch General Information!", error });
  }
};

// Create General Information
export const createGeneralInformation = async (req, res) => {
  const {
    pspId,
    reportingDate,
    totalNumberOfStaffForTheOrganization,
    totalNumberSupportingComplainceAMLTFPF,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newGeneralInformation = await prisma.generalInformation.create({
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        totalNumberOfStaffForTheOrganization: parseInt(totalNumberOfStaffForTheOrganization),
        totalNumberSupportingComplainceAMLTFPF: parseInt(totalNumberSupportingComplainceAMLTFPF),
      },
    });

    res.status(201).json(newGeneralInformation);
  } catch (error) {
    console.log("ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to create General Information!", error });
  }
};

// Update General Information
export const updateGeneralInformation = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    totalNumberOfStaffForTheOrganization,
    totalNumberSupportingComplainceAMLTFPF,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedGeneralInformation = await prisma.generalInformation.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        totalNumberOfStaffForTheOrganization: parseInt(totalNumberOfStaffForTheOrganization),
        totalNumberSupportingComplainceAMLTFPF: parseInt(totalNumberSupportingComplainceAMLTFPF),
      },
    });

    res.status(202).json(updatedGeneralInformation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update General Information!", error });
  }
};

// Delete General Information
export const deleteGeneralInformation = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.generalInformation.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "General Information deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete General Information!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

// Create General Information from CSV
export const createGeneralInformationFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
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
            await prisma.generalInformation.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                totalNumberOfStaffForTheOrganization: parseInt(newSplit[2]),
                totalNumberSupportingComplainceAMLTFPF: parseInt(newSplit[3]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create General Information entry for row: ${JSON.stringify(
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
    console.error("Failed to process the CSV file:", error);
    res.status(500).json({
      message: "Failed to process the CSV file!",
      error,
    });
  }
};