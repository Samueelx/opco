import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";
import { formatDate } from "../lib/utils.js";

// Get all Trust Account Details
export const getTrustAccPlacements = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const trustAccPlacements = await prisma.trustAccPlacement.findMany();

    res.status(200).json(trustAccPlacements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Trust Accounts!", error });
  }
};

// Get a Trust Account Detail
export const getTrustAccPlacement = async (req, res) => {
  const reportingDate = req.params.reportingDate;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const trustAccPlacement = await prisma.trustAccPlacement.findMany({
      where: { reportingDate },
    });

    res.status(200).json(trustAccPlacement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Trust Account Placement!" });
  }
};

// Create a Trust Account Detail
export const createTrustAccPlacement = async (req, res) => {
  const {
    pspId,
    reportingDate,
    trustFundPlacement,
    trustFundInvMaturityDate,
    catTrustFundInvestedAmt,
    interestAmtPerCat,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newTrustAccPlacement = await prisma.trustAccPlacement.create({
      data: {
        pspId,
        reportingDate,
        trustFundPlacement,
        trustFundInvMaturityDate: formatDate(trustFundInvMaturityDate),
        catTrustFundInvestedAmt: parseAmount(catTrustFundInvestedAmt),
        interestAmtPerCat: parseAmount(interestAmtPerCat),
      },
    });

    res.status(201).json(newTrustAccPlacement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a Trust Account Placement!" });
  }
};

// Update a Trust Account Detail
export const updateTrustAccPlacement = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    trustFundPlacement,
    trustFundInvMaturityDate,
    catTrustFundInvestedAmt,
    interestAmtPerCat,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedTrustAccPlacement = await prisma.trustAccPlacement.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        trustFundPlacement,
        trustFundInvMaturityDate: formatDate(trustFundInvMaturityDate),
        catTrustFundInvestedAmt: parseAmount(catTrustFundInvestedAmt),
        interestAmtPerCat: parseAmount(interestAmtPerCat),
      },
    });

    res.status(202).json(updatedTrustAccPlacement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update a Trust Account Placement!" });
  }
};

// Delete a Trust Account Detail
export const deleteTrustAccPlacement = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.trustAccPlacement.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Trust account placement deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete trust account placement!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createTrustAccPlacementFromCSV = async (req, res) => {
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
            await prisma.trustAccPlacement.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                trustFundPlacement: newSplit[2],
                trustFundInvMaturityDate: newSplit[3],
                catTrustFundInvestedAmt: parseAmount(newSplit[4]),
                interestAmtPerCat: parseAmount(newSplit[5]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Trust Account Placement entry for row: ${JSON.stringify(
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
