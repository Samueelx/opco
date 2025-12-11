import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Exchange Rate Infos
export const getExchangeRateInfos = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const exchangeRateInfos = await prisma.exchangeRatesInfo.findMany();

    res.status(200).json(exchangeRateInfos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Exchange Rate Infos!", error });
  }
};

// Get a Exchange Rate Info
export const getExchangeRateInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const exchangeRateInfo = await prisma.exchangeRatesInfo.findUnique({
      where: { rowId },
    });

    res.status(200).json(exchangeRateInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Exchange Rate Info!", error });
  }
};

// Create a Exchange Rate Info
export const createExchangeRateInfo = async (req, res) => {
  const {
    institutionCode,
    reportingDate,
    currencyCode,
    buyingRate,
    sellingRate,
    meanRate,
    closingBidRate,
    closingOfferRate,
    usdCrossRate,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newExchangeRateInfo = await prisma.exchangeRatesInfo.create({
      data: {
        institutionCode,
        reportingDate,
        currencyCode,
        buyingRate: parseAmount(buyingRate),
        sellingRate: parseAmount(sellingRate),
        meanRate: parseAmount(meanRate),
        closingBidRate: parseAmount(closingBidRate),
        closingOfferRate: parseAmount(closingOfferRate),
        usdCrossRate: parseAmount(usdCrossRate),
      },
    });

    res.status(201).json(newExchangeRateInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Exchange Rate Info!",
      error,
    });
  }
};

// Update a Exchange Rate Info
export const updateExchangeRateInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    institutionCode,
    reportingDate,
    currencyCode,
    buyingRate,
    sellingRate,
    meanRate,
    closingBidRate,
    closingOfferRate,
    usdCrossRate,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedExchangeRateInfo = await prisma.exchangeRatesInfo.update({
      where: { rowId },
      data: {
        institutionCode,
        reportingDate,
        currencyCode,
        buyingRate: parseAmount(buyingRate),
        sellingRate: parseAmount(sellingRate),
        meanRate: parseAmount(meanRate),
        closingBidRate: parseAmount(closingBidRate),
        closingOfferRate: parseAmount(closingOfferRate),
        usdCrossRate: parseAmount(usdCrossRate),
      },
    });

    res.status(202).json(updatedExchangeRateInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Exchange Rate Info!",
      error,
    });
  }
};

// Delete a Exchange Rate Info
export const deleteExchangeRateInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.exchangeRatesInfo.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Exchange Rate Info deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Exchange Rate Info!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createExchangeRateInfoFromCSV = async (req, res) => {
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
            await prisma.exchangeRatesInfo.create({
              data: {
                institutionCode: newSplit[0],
                reportingDate: newSplit[1],
                currencyCode: newSplit[2],
                buyingRate: parseAmount(newSplit[3]),
                sellingRate: parseAmount(newSplit[4]),
                meanRate: parseAmount(newSplit[5]),
                closingBidRate: parseAmount(newSplit[6]),
                closingOfferRate: parseAmount(newSplit[7]),
                usdCrossRate: parseAmount(newSplit[8]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Exchange Rate Info entry for row: ${JSON.stringify(
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
