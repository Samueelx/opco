import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Shareholder Infos
export const getShareholderInfos = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const shareholderInfos = await prisma.shareholderInfo.findMany();

    res.status(200).json(shareholderInfos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Shareholder Infos!", error });
  }
};

// Get a Shareholder Info
export const getShareholderInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const shareholderInfo = await prisma.shareholderInfo.findUnique({
      where: { rowId },
    });

    res.status(200).json(shareholderInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Shareholder Info!", error });
  }
};

// Create a Shareholder Info
export const createShareholderInfo = async (req, res) => {
  const {
    bankCode,
    reportingDate,
    shareholderSequence,
    name,
    gender,
    type,
    registrationDate,
    nationality,
    residence,
    idNumber,
    address,
    phoneNumber,
    majorPromoter,
    subscribedShares,
    shareValue,
    shareholdingAmount,
    paidUpShares,
    percentageOfShare,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!11" });

    const newShareholderInfo = await prisma.shareholderInfo.create({
      data: {
        bankCode,
        reportingDate,
        shareholderSequence,
        name,
        gender,
        type,
        registrationDate,
        nationality,
        residence,
        idNumber,
        address,
        phoneNumber,
        majorPromoter,
        subscribedShares: parseAmount(subscribedShares),
        shareValue: parseAmount(shareValue),
        shareholdingAmount: parseAmount(shareholdingAmount),
        paidUpShares: parseAmount(paidUpShares),
        percentageOfShare: parseAmount(percentageOfShare),
      },
    });

    res.status(201).json(newShareholderInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Shareholder Info!",
      error,
    });
  }
};

// Update a Shareholder Info
export const updateShareholderInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    bankCode,
    reportingDate,
    shareholderSequence,
    name,
    gender,
    type,
    registrationDate,
    nationality,
    residence,
    idNumber,
    address,
    phoneNumber,
    majorPromoter,
    subscribedShares,
    shareValue,
    shareholdingAmount,
    paidUpShares,
    percentageOfShare,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedShareholderInfo = await prisma.shareholderInfo.update({
      where: { rowId },
      data: {
        bankCode,
        reportingDate,
        shareholderSequence,
        name,
        gender,
        type,
        registrationDate,
        nationality,
        residence,
        idNumber,
        address,
        phoneNumber,
        majorPromoter,
        subscribedShares: parseAmount(subscribedShares),
        shareValue: parseAmount(shareValue),
        shareholdingAmount: parseAmount(shareholdingAmount),
        paidUpShares: parseAmount(paidUpShares),
        percentageOfShare: parseAmount(percentageOfShare),
      },
    });

    res.status(202).json(updatedShareholderInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Shareholder Info!",
      error,
    });
  }
};

// Delete a Shareholder Info
export const deleteShareholderInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.shareholderInfo.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Shareholder Info deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Shareholder Info!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createShareholderInfoFromCSV = async (req, res) => {
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
            await prisma.shareholderInfo.create({
              data: {
                bankCode: newSplit[0],
                reportingDate: newSplit[1],
                shareholderSequence: newSplit[2],
                name: newSplit[3],
                gender: newSplit[4],
                type: newSplit[5],
                registrationDate: newSplit[6],
                nationality: newSplit[7],
                residence: newSplit[8],
                idNumber: newSplit[9],
                address: newSplit[10],
                phoneNumber: newSplit[11],
                majorPromoter: newSplit[12],
                subscribedShares: parseAmount(newSplit[13]),
                shareValue: parseAmount(newSplit[14]),
                shareholdingAmount: parseAmount(newSplit[15]),
                paidUpShares: parseAmount(newSplit[16]),
                percentageOfShare: parseAmount(newSplit[17]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Shareholder Info entry for row: ${JSON.stringify(
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
