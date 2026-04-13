import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Trust Account Details
export const getTrustAccounts = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const trustAccounts = await prisma.trustAcc.findMany();

    res.status(200).json(trustAccounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Trust Accounts!", error });
  }
};

// Get a Trust Account Details
export const getTrustAccount = async (req, res) => {
  const reportingDate = req.params.reportingDate;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const trustAccount = await prisma.trustAcc.findMany({
      where: { reportingDate },
    });

    res.status(200).json(trustAccount);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Trust Account!", error });
  }
};

// Create a Trust Account Details
export const createTrustAccount = async (req, res) => {
  const {
    pspId,
    bankId,
    reportingDate,
    bankAccNumber,
    trustAccDrTypeCode,
    orgReceivingDonation,
    sectorCode = "",
    trustAccIntUtilizedDetails,
    openingBal,
    principalAmount,
    interestEarned,
    trustAccInterestUtilized,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;
  console.log("Req in controller:", req)
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token in controller:", decodedToken)
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newTrustAcc = await prisma.trustAcc.create({
      data: {
        pspId,
        bankId,
        reportingDate,
        bankAccNumber,
        trustAccDrTypeCode,
        orgReceivingDonation,
        sectorCode,
        trustAccIntUtilizedDetails,
        openingBal: parseAmount(openingBal),
        principalAmount: parseAmount(principalAmount),
        interestEarned: parseAmount(interestEarned),
        closingBal: parseAmount(principalAmount) + parseAmount(interestEarned),
        trustAccInterestUtilized: parseAmount(trustAccInterestUtilized),
      },
    });

    res.status(201).json(newTrustAcc);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Trust Account!", error });
  }
};

// Update a Trust Account Details
export const updateTrustAccount = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    bankId,
    reportingDate,
    bankAccNumber,
    trustAccDrTypeCode,
    orgReceivingDonation,
    sectorCode = "",
    trustAccIntUtilizedDetails,
    openingBal,
    principalAmount,
    interestEarned,
    trustAccInterestUtilized,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedTrustAcc = await prisma.trustAcc.update({
      where: { rowId },
      data: {
        pspId,
        bankId,
        reportingDate,
        bankAccNumber,
        trustAccDrTypeCode,
        orgReceivingDonation,
        sectorCode,
        trustAccIntUtilizedDetails,
        openingBal: parseAmount(openingBal),
        principalAmount: parseAmount(principalAmount),
        interestEarned: parseAmount(interestEarned),
        closingBal: parseAmount(principalAmount) + parseAmount(interestEarned),
        trustAccInterestUtilized: parseAmount(trustAccInterestUtilized),
      },
    });

    res.status(202).json({
      message: "Trust Account updated successfully!",
      updatedTrustAcc,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update trust account!", error });
  }
};

// Delete a Trust Account Detail
export const deleteTrustAccount = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.trustAcc.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Trust account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trust account!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};


export const createTrustAccountFromCSV = async (req, res) => {
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
    console.log("user type", userTokenUserType);

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv()) // default comma separator
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        try {
          const validRows = rows.filter(row => {
            const vals = Object.values(row);
            // Skip empty rows or rows where the first column is blank
            return vals.length > 0 && vals.some(v => typeof v === 'string' && v.trim() !== '');
          });

          // Valid SectorCode enum values (must match schema.prisma exactly)
          const VALID_SECTOR_CODES = new Set([
            'P2B05','P2B06','P2B07','P2B08','P2B09','P2B10','P2B11','P2B12',
            'P2B13','P2B14','P2B15','P2B16','P2B17','P2B18','P2B19','P2B20',
            'P2B21','P2B22','P2B23','P2B24','P2B99',
          ]);

          // Normalize any incoming date to YYYY-MM-DD (the standard stored format).
          // Handles: DD-MM-YY (09-04-26), DD-MM-YYYY (09-04-2026), YYYY-MM-DD (passthrough).
          const normalizeDate = (raw) => {
            if (!raw) return raw;
            const s = raw.trim();
            // Already YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
            // DD-MM-YY or DD-MM-YYYY
            const match = s.match(/^(\d{2})-(\d{2})-(\d{2,4})$/);
            if (match) {
              const [, dd, mm, yy] = match;
              const yyyy = yy.length === 2 ? `20${yy}` : yy;
              return `${yyyy}-${mm}-${dd}`;
            }
            return s; // return as-is if unrecognised
          };

          // Create an array of Promises, one for each database insertion attempt
          const createPromises = validRows.map(async (row) => {
            // csv-parser now parses columns by name; map by position via Object.values
            const cols = Object.values(row);
            const rawSectorCode = cols[6]?.trim();
            const sectorCode = VALID_SECTOR_CODES.has(rawSectorCode) ? rawSectorCode : undefined;

            const data = {
              pspId: cols[0]?.trim(),
              bankId: cols[1]?.trim(),
              reportingDate: normalizeDate(cols[2]),
              bankAccNumber: cols[3]?.trim(),
              trustAccDrTypeCode: cols[4]?.trim(),
              orgReceivingDonation: cols[5]?.trim(),
              sectorCode,
              trustAccIntUtilizedDetails: cols[7]?.trim(),
              openingBal: parseAmount(cols[8]),
              principalAmount: parseAmount(cols[9]),
              interestEarned: parseAmount(cols[10]),
              closingBal: parseAmount(cols[9]) + parseAmount(cols[10]), // principal + interest
              trustAccInterestUtilized: parseAmount(cols[11]),
            };


            try {
              const created = await prisma.trustAcc.create({ data });
              console.log("File data uploaded successfully for a row");
              return { status: 'success', record: created };
            } catch (error) {
              const errMsg = error.message ?? String(error);
              console.error(
                `Failed to create a Trust Account entry for row: ${JSON.stringify(cols)}`,
                errMsg
              );
              return { status: 'error', error: errMsg };
            }
          });

          // Wait for ALL promises in the array to settle (either success or failure)
          const results = await Promise.all(createPromises);
          console.log("Results here");

          const failedResults = results.filter(r => r.status === 'error');
          failedResults.forEach(result => {
            console.error(`[SUMMARY ERROR] Row failed — Reason: ${result.error}`);
          });

          // Clean up the uploaded file
          deleteFile(filePath);

          const successCount = results.length - failedResults.length;
          console.log(`CSV processing complete: ${successCount}/${results.length} rows inserted.`);

          const insertedRecords = results.filter(r => r.status === 'success').map(r => r.record);

          if (failedResults.length > 0) {
            res.status(207).json({
              message: `${successCount} of ${results.length} rows inserted. ${failedResults.length} row(s) failed.`,
              records: insertedRecords,
              errors: failedResults.map(r => r.error),
            });
          } else {
            res.status(201).json({
              message: `CSV file processed successfully. ${successCount} rows inserted.`,
              records: insertedRecords,
            });
          }
        } catch (error) {
          console.error("Critical error in processing rows:", error);
          if (!res.headersSent) {
            res.status(500).json({ message: "Failed during database insertion process.", error: error.message });
          }
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        // Clean up file if stream error occurs
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        res.status(500).json({ message: "Error reading CSV file", error });
      });
  } catch (error) {
    console.error("Failed to process the CSV file:", error);
    // Clean up file if outer error occurs
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({
      message: "Failed to process the CSV file!",
      error,
    });
  }
};