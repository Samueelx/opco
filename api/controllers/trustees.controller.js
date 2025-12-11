import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Trustees
export const getTrustees = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const allTrustees = await prisma.trustee.findMany();

    res.status(200).json(allTrustees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Trustees!", error });
  }
};

// Get a Trustee
export const getTrustee = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const oneTrustee = await prisma.trustee.findUnique({
      where: { rowId },
    });

    res.status(200).json(oneTrustee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Trustee!", error });
  }
};

// Create a Trustee
export const createTrustee = async (req, res) => {
  const {
    pspId,
    reportingDate,
    trustCompanyName,
    directorsOfTrustCo,
    trusteeNames,
    trustGender,
    dateOfBirth,
    nationalityOfTrustee,
    residenceOfShareholder,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    otherTrusteeships,
    disclosureDetails,
    shareholderOfTrust,
    percentageOfShareholding,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newTrustee = await prisma.trustee.create({
      data: {
        pspId,
        reportingDate,
        trustCompanyName,
        directorsOfTrustCo,
        trusteeNames,
        trustGender,
        dateOfBirth,
        nationalityOfTrustee,
        residenceOfShareholder,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        otherTrusteeships,
        disclosureDetails,
        shareholderOfTrust,
        percentageOfShareholding: parseAmount(percentageOfShareholding),
      },
    });

    res.status(201).json(newTrustee);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Trustee!", error });
  }
};

// Update a Trustee
export const updateTrustee = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    trustCompanyName,
    directorsOfTrustCo,
    trusteeNames,
    trustGender,
    dateOfBirth,
    nationalityOfTrustee,
    residenceOfShareholder,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    otherTrusteeships,
    disclosureDetails,
    shareholderOfTrust,
    percentageOfShareholding,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedTrustee = await prisma.trustee.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        trustCompanyName,
        directorsOfTrustCo,
        trusteeNames,
        trustGender,
        dateOfBirth,
        nationalityOfTrustee,
        residenceOfShareholder,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        otherTrusteeships,
        disclosureDetails,
        shareholderOfTrust,
        percentageOfShareholding: parseAmount(percentageOfShareholding),
      },
    });

    res
      .status(202)
      .json({ message: "Trustee updated successfully!", updatedTrustee });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Trustee!", error });
  }
};

// Delete a Trustee
export const deleteTrustee = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "trust" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.trustee.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Trustee deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Trustee!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createTrusteeFromCSV = async (req, res) => {
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
            await prisma.trustee.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                trustCompanyName: newSplit[2],
                directorsOfTrustCo: newSplit[3],
                trusteeNames: newSplit[4],
                trustGender: newSplit[5],
                dateOfBirth: newSplit[6],
                nationalityOfTrustee: newSplit[7],
                residenceOfShareholder: newSplit[8],
                idNumber: newSplit[9],
                kraPin: newSplit[10],
                contact: newSplit[11],
                academicQualifications: newSplit[12],
                otherTrusteeships: newSplit[13],
                disclosureDetails: newSplit[14],
                shareholderOfTrust: newSplit[15],
                percentageOfShareholding: parseAmount(newSplit[16]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Trustee entry for row: ${JSON.stringify(
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
