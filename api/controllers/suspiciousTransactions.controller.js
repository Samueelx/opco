import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";
import { formatDateToIncidentDateFormat, parseAmount } from "../utils/utils.js";


const mapTransactionFlag = (flag) => {
  if (flag === "Suspicious") return "MLCFTFC01";
  if (flag === "Cash") return "MLCFTFC02";
  return flag; // Return as-is if it's already a code
};

// Get all Suspicious Transactions
export const getSuspiciousTransactions = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const suspiciousTransactions =
      await prisma.suspiciousTransaction.findMany();

    res.status(200).json(suspiciousTransactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Suspicious Transactions!", error });
  }
};

// Get Suspicious Transactions by Reporting Date
export const getSuspiciousTransaction = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = formatDateToIncidentDateFormat(date);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const suspiciousTransaction = await prisma.suspiciousTransaction.findMany({
      where: { reportingDate },
    });

    res.status(200).json(suspiciousTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Suspicious Transaction!", error });
  }
};

// Create a Suspicious Transaction
export const createSuspiciousTransaction = async (req, res) => {
  const {
    pspId,
    reportingDate,
    transactionFlag,
    numberOfMLRelatedSTRsReported,
    numberOfTFRelatedSTRsReported,
    numberOfPFRelatedSTRsReported,
    numberOfTransactionsAbove15000,
    totalValueOfTransactionsAbove15000,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newSuspiciousTransaction = await prisma.suspiciousTransaction.create({
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        transactionFlag: mapTransactionFlag(transactionFlag),
        numberOfMLRelatedSTRsReported: parseInt(numberOfMLRelatedSTRsReported),
        numberOfTFRelatedSTRsReported: parseInt(numberOfTFRelatedSTRsReported),
        numberOfPFRelatedSTRsReported: parseInt(numberOfPFRelatedSTRsReported),
        numberOfTransactionsAbove15000: parseInt(numberOfTransactionsAbove15000),
        totalValueOfTransactionsAbove15000: parseAmount(totalValueOfTransactionsAbove15000),
      },
    });

    res.status(201).json(newSuspiciousTransaction);
  } catch (error) {
    console.log("ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to create a Suspicious Transaction!", error });
  }
};

// Update a Suspicious Transaction
export const updateSuspiciousTransaction = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    transactionFlag,
    numberOfMLRelatedSTRsReported,
    numberOfTFRelatedSTRsReported,
    numberOfPFRelatedSTRsReported,
    numberOfTransactionsAbove15000,
    totalValueOfTransactionsAbove15000,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedSuspiciousTransaction = await prisma.suspiciousTransaction.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        transactionFlag: mapTransactionFlag(transactionFlag),
        numberOfMLRelatedSTRsReported: parseInt(numberOfMLRelatedSTRsReported),
        numberOfTFRelatedSTRsReported: parseInt(numberOfTFRelatedSTRsReported),
        numberOfPFRelatedSTRsReported: parseInt(numberOfPFRelatedSTRsReported),
        numberOfTransactionsAbove15000: parseInt(numberOfTransactionsAbove15000),
        totalValueOfTransactionsAbove15000: parseAmount(totalValueOfTransactionsAbove15000),
      },
    });

    res.status(202).json(updatedSuspiciousTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update a Suspicious Transaction!", error });
  }
};

// Delete a Suspicious Transaction
export const deleteSuspiciousTransaction = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.suspiciousTransaction.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Suspicious Transaction deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Suspicious Transaction!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

// Create Suspicious Transactions from CSV
export const createSuspiciousTransactionFromCSV = async (req, res) => {
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
            await prisma.suspiciousTransaction.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                transactionFlag: mapTransactionFlag(newSplit[2]),
                numberOfMLRelatedSTRsReported: parseInt(newSplit[3]),
                numberOfTFRelatedSTRsReported: parseInt(newSplit[4]),
                numberOfPFRelatedSTRsReported: parseInt(newSplit[5]),
                numberOfTransactionsAbove15000: parseInt(newSplit[6]),
                totalValueOfTransactionsAbove15000: parseAmount(newSplit[7]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Suspicious Transaction entry for row: ${JSON.stringify(
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
  // finally {
  //   deleteFile(filePath); // Remove the file after processing
  // }
};