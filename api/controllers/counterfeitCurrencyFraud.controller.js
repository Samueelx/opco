import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";
import { formatDateToIncidentDateFormat } from "../utils/utils.js";

// Get all Counterfeit Currency Frauds
export const getCounterfeitCurrencyFrauds = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const counterfeitCurrencyFrauds =
      await prisma.counterfeitCurrencyFraud.findMany();

    res.status(200).json(counterfeitCurrencyFrauds);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Counterfeit Currency Frauds!", error });
  }
};

// Get a Counterfeit Currency Fraud
export const getCounterfeitCurrencyFraud = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = formatDateToIncidentDateFormat(date)
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const counterfeitCurrencyFraud =
      await prisma.counterfeitCurrencyFraud.findMany({
        where: { reportingDate },
      });

    res.status(200).json(counterfeitCurrencyFraud);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Counterfeit Currency Fraud!", error });
  }
};

// Create a Counterfeit Currency Fraud
export const createCounterfeitCurrencyFraud = async (req, res) => {
  const {
    pspId,
    reportingDate,
    subCountyCode,
    agentId,
    denominationCode,
    serialNumber,
    depositorsName,
    tellersName,
    dateConfiscated,
    dateSubmittedToCBK,
    remarks,
    numberOfPieces,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newCounterfeitCurrencyFraud =
      await prisma.counterfeitCurrencyFraud.create({
        data: {
          pspId,
          reportingDate: formatDate(reportingDate),
          subCountyCode,
          agentId,
          denominationCode,
          serialNumber,
          depositorsName,
          tellersName,
          dateConfiscated: dateConfiscated ? formatDate(dateConfiscated) : "",
          dateSubmittedToCBK: dateSubmittedToCBK ? formatDate(dateSubmittedToCBK) : "",
          remarks,
          numberOfPieces: parseInt(numberOfPieces),
        },
      });

    res.status(201).json(newCounterfeitCurrencyFraud);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Counterfeit Currency Fraud!",
      error,
    });
  }
};

// Update a Counterfeit Currency Fraud
export const updateCounterfeitCurrencyFraud = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    subCountyCode,
    agentId,
    denominationCode,
    serialNumber,
    depositorsName,
    tellersName,
    dateConfiscated,
    dateSubmittedToCBK,
    remarks,
    numberOfPieces,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedcounterfeitCurrencyFraud =
      await prisma.counterfeitCurrencyFraud.update({
        where: { rowId },
        data: {
          pspId,
          reportingDate: formatDate(reportingDate),
          subCountyCode,
          agentId,
          denominationCode,
          serialNumber,
          depositorsName,
          tellersName,
          dateConfiscated: dateConfiscated ? formatDate(dateConfiscated) : "",
          dateSubmittedToCBK: dateSubmittedToCBK ? formatDate(dateSubmittedToCBK) : "",
          remarks,
          numberOfPieces: parseInt(numberOfPieces),
        },
      });

    res.status(202).json(updatedcounterfeitCurrencyFraud);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Counterfeit Currency Fraud!",
      error,
    });
  }
};

// Delete a Counterfeit Currency Fraud
export const deleteCounterfeitCurrencyFraud = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "security" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.counterfeitCurrencyFraud.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Counterfeit Currency Fraud deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Counterfeit Currency Fraud!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createCounterfeitCurrencyFraudFromCSV = async (req, res) => {
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
            await prisma.counterfeitCurrencyFraud.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                subCountyCode: newSplit[2],
                agentId: newSplit[3],
                denominationCode: newSplit[4],
                serialNumber: newSplit[5],
                depositorsName: newSplit[6],
                tellersName: newSplit[7],
                dateConfiscated: newSplit[8],
                dateSubmittedToCBK: newSplit[9],
                remarks: newSplit[10],
                numberOfPieces: parseInt(newSplit[11]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Counterfeit Currency Fraud entry for row: ${JSON.stringify(
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
