import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Financial position and Comprehensive Incomes
export const getFinancialPositions = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const financialPosition = await prisma.financialPosition.findMany();

    res.status(200).json(financialPosition);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Financial position and Comprehensive Incomes!",
      error,
    });
  }
};

// Get a Financial position and Comprehensive Income
export const getFinancialPosition = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const financialPosition = await prisma.financialPosition.findUnique({
      where: { rowId },
    });

    res.status(200).json(financialPosition);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Financial position and Comprehensive Income!",
      error,
    });
  }
};

// Create a Financial position and Comprehensive Income
export const createFinancialPosition = async (req, res) => {
  const {
    fxbCode,
    reportingDate,
    mappingCode,
    amount,
    numberOfEmployees,
    numberOfOutlets,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newFinancialPosition = await prisma.financialPosition.create({
      data: {
        fxbCode,
        reportingDate,
        mappingCode,
        amount: parseAmount(amount),
        numberOfEmployees: parseInt(numberOfEmployees),
        numberOfOutlets: parseInt(numberOfOutlets),
      },
    });

    res.status(201).json(newFinancialPosition);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to create a Financial position and Comprehensive Income!",
      error,
    });
  }
};

// Update a Financial position and Comprehensive Income
export const updateFinancialPosition = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    fxbCode,
    reportingDate,
    mappingCode,
    amount,
    numberOfEmployees,
    numberOfOutlets,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedFinancialPosition = await prisma.financialPosition.update({
      where: { rowId },
      data: {
        fxbCode,
        reportingDate,
        mappingCode,
        amount: parseAmount(amount),
        numberOfEmployees: parseInt(numberOfEmployees),
        numberOfOutlets: parseInt(numberOfOutlets),
      },
    });

    res.status(202).json(updatedFinancialPosition);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to update a Financial position and Comprehensive Income!",
      error,
    });
  }
};

// Delete a Financial position and Comprehensive Income
export const deleteFinancialPosition = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.financialPosition.delete({
      where: { rowId },
    });

    res.status(204).json({
      message:
        "Financial position and Comprehensive Income deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Financial position and Comprehensive Income!",
      error,
    });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createFinancialPositionFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
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
            await prisma.financialPosition.create({
              data: {
                fxbCode: newSplit[0],
                reportingDate: newSplit[1],
                mappingCode: newSplit[2],
                amount: parseAmount(newSplit[3]),
                numberOfEmployees: parseInt(newSplit[4]),
                numberOfOutlets: parseInt(newSplit[5]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Financial Position entry for row: ${JSON.stringify(
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
