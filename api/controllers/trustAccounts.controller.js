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
      .pipe(csv({ separator: "\n" }))
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        // Create an array of Promises, one for each database insertion attempt
        const createPromises = rows.map(async (row) => {
          const newSplit = Object.values(row)[0].split(",");
          try {
            await prisma.trustAcc.create({
              data: {
                pspId: newSplit[0],
                bankId: newSplit[1],
                reportingDate: newSplit[2],
                bankAccNumber: newSplit[3],
                trustAccDrTypeCode: newSplit[4],
                orgReceivingDonation: newSplit[5],
                sectorCode: newSplit[6],
                trustAccIntUtilizedDetails: newSplit[7],
                openingBal: parseAmount(newSplit[8]),
                principalAmount: parseAmount(newSplit[9]),
                interestEarned: parseAmount(newSplit[10]),
                closingBal: parseAmount(newSplit[11]) + parseAmount(newSplit[12]),
                trustAccInterestUtilized: parseAmount(newSplit[13]),
              },
            });
            console.log("File data uploaded successfully for a row");
            return { status: 'success', row: row };
          } catch (error) {
            console.error(
              `Failed to create a Trust Account entry for row: ${JSON.stringify(
                row
              )}`,
              error
            );
            // Return an error status for this specific row instead of throwing entirely
            return { status: 'error', row: row, error: error.message };
          }
        });

        // Wait for ALL promises in the array to settle (either success or failure)
        const results = await Promise.all(createPromises);
        console.log("Results here")
        results.forEach(result => {
          if (result.status === 'error'){
            console.error(`[SUMMARY ERROR] Row failed: ${JSON.stringify(result.row)} Reason: ${result.error}`);
          }
        });

        // Clean up the uploaded file
        //fs.unlinkSync(filePath);

        // You can now analyze 'results' to see if any errors occurred
        const errorsOccurred = results.some(result => result.status === 'error');

        if (errorsOccurred) {
          // If any single row failed, return a 500 or 400 error status
          console.log("Errors occured", errorsOccurred);
          res.status(500).json({ message: "Some rows failed to process during database insertion." });
        } else {
          // If all rows succeeded, return 201 success
          res.status(201).json({ message: "CSV file processed successfully, all rows inserted." });
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