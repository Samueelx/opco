import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Shareholders
export const getShareholders = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const shareholders = await prisma.shareholder.findMany();

    res.status(200).json(shareholders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Shareholders!", error });
  }
};

// Get a Shareholder
export const getShareholder = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const oneShareholder = await prisma.shareholder.findUnique({
      where: { rowId },
    });

    res.status(200).json(oneShareholder);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Shareholder!", error });
  }
};

// Create a Shareholder
export const createShareholder = async (req, res) => {
  const {
    pspId,
    reportingDate,
    shareholderName,
    shareholderGender,
    shareholderType,
    dateOfBirth,
    nationalityOfShareholder,
    residenceOfShareholder,
    countryOfIncorporation,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    previousEmployment,
    dateBecameShareholder,
    numberOfShareHeld,
    shareValue,
    percentageOfShare,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newShareholder = await prisma.shareholder.create({
      data: {
        pspId,
        reportingDate,
        shareholderName,
        shareholderGender,
        shareholderType,
        dateOfBirth,
        nationalityOfShareholder,
        residenceOfShareholder,
        countryOfIncorporation,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        previousEmployment,
        dateBecameShareholder,
        numberOfShareHeld: parseInt(numberOfShareHeld),
        shareValue: parseAmount(shareValue),
        percentageOfShare: parseAmount(percentageOfShare),
      },
    });

    res.status(201).json(newShareholder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Shareholder!", error });
  }
};

// Update a Shareholder
export const updateShareholder = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    shareholderName,
    shareholderGender,
    shareholderType,
    dateOfBirth,
    nationalityOfShareholder,
    residenceOfShareholder,
    countryOfIncorporation,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    previousEmployment,
    dateBecameShareholder,
    numberOfShareHeld,
    shareValue,
    percentageOfShare,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedShareholder = await prisma.shareholder.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        shareholderName,
        shareholderGender,
        shareholderType,
        dateOfBirth,
        nationalityOfShareholder,
        residenceOfShareholder,
        countryOfIncorporation,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        previousEmployment,
        dateBecameShareholder,
        numberOfShareHeld: parseInt(numberOfShareHeld),
        shareValue: parseAmount(shareValue),
        percentageOfShare: parseAmount(percentageOfShare),
      },
    });

    res.status(202).json({
      message: "Shareholder updated successfully!",
      updatedShareholder,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Shareholder!", error });
  }
};

// Delete a Shareholder
export const deleteShareholder = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.shareholder.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Shareholder deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Shareholder!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createShareholderFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
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
            await prisma.shareholder.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                shareholderName: newSplit[2],
                shareholderGender: newSplit[3],
                shareholderType: newSplit[4],
                dateOfBirth: newSplit[5],
                nationalityOfShareholder: newSplit[6],
                residenceOfShareholder: newSplit[7],
                countryOfIncorporation: newSplit[8],
                idNumber: newSplit[9],
                kraPin: newSplit[10],
                contact: newSplit[11],
                academicQualifications: newSplit[12],
                previousEmployment: newSplit[13],
                dateBecameShareholder: newSplit[14],
                numberOfShareHeld: parseInt(newSplit[15]),
                shareValue: parseAmount(newSplit[16]),
                percentageOfShare: parseAmount(newSplit[17]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Shareholder entry for row: ${JSON.stringify(
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
