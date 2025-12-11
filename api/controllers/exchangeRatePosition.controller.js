import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Foreign Exchange Positions
export const getForeignExchangePositions = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const foreignExchangePositions =
      await prisma.foreignExchangePosition.findMany();

    res.status(200).json(foreignExchangePositions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Foreign Exchange Positions!", error });
  }
};

// Get a Foreign Exchange Position
export const getForeignExchangePosition = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const foreignExchangePosition =
      await prisma.foreignExchangePosition.findUnique({
        where: { rowId },
      });

    res.status(200).json(foreignExchangePosition);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Foreign Exchange Position!", error });
  }
};

// Create a Foreign Exchange Position
export const createForeignExchangePosition = async (req, res) => {
  const {
    institutionCode,
    reportingDate,
    currencyCode,
    kesSpotRate,
    openingPositionAmount,
    totalInflowsAmount,
    otherTotalInflowsAmount,
    totalOutflowsAmount,
    otherTotalOutflowsAmount,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newForeignExchangePosition =
      await prisma.foreignExchangePosition.create({
        data: {
          institutionCode,
          reportingDate,
          currencyCode,
          kesSpotRate: parseAmount(kesSpotRate),
          openingPositionAmount: parseAmount(openingPositionAmount),
          totalInflowsAmount: parseAmount(totalInflowsAmount),
          otherTotalInflowsAmount: parseAmount(otherTotalInflowsAmount),
          totalOutflowsAmount: parseAmount(totalOutflowsAmount),
          otherTotalOutflowsAmount: parseAmount(otherTotalOutflowsAmount),
        },
      });

    res.status(201).json(newForeignExchangePosition);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Foreign Exchange Position!",
      error,
    });
  }
};

// Update a Foreign Exchange Position
export const updateForeignExchangePosition = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    institutionCode,
    reportingDate,
    currencyCode,
    kesSpotRate,
    openingPositionAmount,
    totalInflowsAmount,
    otherTotalInflowsAmount,
    totalOutflowsAmount,
    otherTotalOutflowsAmount,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedForeignExchangePosition =
      await prisma.foreignExchangePosition.update({
        where: { rowId },
        data: {
          institutionCode,
          reportingDate,
          currencyCode,
          kesSpotRate: parseAmount(kesSpotRate),
          openingPositionAmount: parseAmount(openingPositionAmount),
          totalInflowsAmount: parseAmount(totalInflowsAmount),
          otherTotalInflowsAmount: parseAmount(otherTotalInflowsAmount),
          totalOutflowsAmount: parseAmount(totalOutflowsAmount),
          otherTotalOutflowsAmount: parseAmount(otherTotalOutflowsAmount),
        },
      });

    res.status(202).json(updatedForeignExchangePosition);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Foreign Exchange Position!",
      error,
    });
  }
};

// Delete a Foreign Exchange Position
export const deleteForeignExchangePosition = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.foreignExchangePosition.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Foreign Exchange Position deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Foreign Exchange Position!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createForeignExchangePositionFromCSV = async (req, res) => {
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
            await prisma.foreignExchangePosition.create({
              data: {
                institutionCode: newSplit[0],
                reportingDate: newSplit[1],
                currencyCode: newSplit[2],
                kesSpotRate: parseAmount(newSplit[3]),
                openingPositionAmount: parseAmount(newSplit[4]),
                totalInflowsAmount: parseAmount(newSplit[5]),
                otherTotalInflowsAmount: parseAmount(newSplit[6]),
                totalOutflowsAmount: parseAmount(newSplit[7]),
                otherTotalOutflowsAmount: parseAmount(newSplit[8]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Foreign Exchange Position entry for row: ${JSON.stringify(
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
