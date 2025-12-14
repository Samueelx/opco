import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";
import { formatDateToIncidentDateFormat, parseAmount } from "../utils/utils.js";

// Get all UN Sanctions List records
export const getUNSanctionsListRecords = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const unSanctionsList = await prisma.uNSanctionsList.findMany();

    res.status(200).json(unSanctionsList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch UN Sanctions List records!", error });
  }
};

// Get UN Sanctions List by Reporting Date
export const getUNSanctionsList = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = formatDateToIncidentDateFormat(date);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const unSanctionsList = await prisma.uNSanctionsList.findMany({
      where: { reportingDate },
    });

    res.status(200).json(unSanctionsList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch UN Sanctions List!", error });
  }
};

// Create UN Sanctions List entry
export const createUNSanctionsList = async (req, res) => {
  const {
    pspId,
    reportingDate,
    typeOfTransaction,
    typeOfAccountInvolved,
    nameOfPersonListedInUNSCList,
    accountName,
    accountNumber,
    nameOfFinancialInstitution,
    financialInstitutionsInvolved,
    countriesInvolvedInTransaction,
    amount,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newUNSanctionsList = await prisma.uNSanctionsList.create({
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        typeOfTransaction,
        typeOfAccountInvolved,
        nameOfPersonListedInUNSCList,
        accountName,
        accountNumber,
        nameOfFinancialInstitution,
        financialInstitutionsInvolved,
        countriesInvolvedInTransaction,
        amount: parseAmount(amount),
      },
    });

    res.status(201).json(newUNSanctionsList);
  } catch (error) {
    console.log("ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to create UN Sanctions List entry!", error });
  }
};

// Update UN Sanctions List entry
export const updateUNSanctionsList = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    typeOfTransaction,
    typeOfAccountInvolved,
    nameOfPersonListedInUNSCList,
    accountName,
    accountNumber,
    nameOfFinancialInstitution,
    financialInstitutionsInvolved,
    countriesInvolvedInTransaction,
    amount,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedUNSanctionsList = await prisma.uNSanctionsList.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        typeOfTransaction,
        typeOfAccountInvolved,
        nameOfPersonListedInUNSCList,
        accountName,
        accountNumber,
        nameOfFinancialInstitution,
        financialInstitutionsInvolved,
        countriesInvolvedInTransaction,
        amount: parseAmount(amount),
      },
    });

    res.status(202).json(updatedUNSanctionsList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update UN Sanctions List entry!", error });
  }
};

// Delete UN Sanctions List entry
export const deleteUNSanctionsList = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "compliance" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.uNSanctionsList.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "UN Sanctions List entry deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete UN Sanctions List entry!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

// Create UN Sanctions List entries from CSV
export const createUNSanctionsListFromCSV = async (req, res) => {
  const filePath = path.resolve(req.file.path);
  const token = req.cookies?.token;

  console.log(`File path: ${filePath}`);

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
            await prisma.uNSanctionsList.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                typeOfTransaction: newSplit[2],
                typeOfAccountInvolved: newSplit[3],
                nameOfPersonListedInUNSCList: newSplit[4],
                accountName: newSplit[5],
                accountNumber: newSplit[6],
                nameOfFinancialInstitution: newSplit[7],
                financialInstitutionsInvolved: newSplit[8],
                countriesInvolvedInTransaction: newSplit[9],
                amount: parseAmount(newSplit[10]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create UN Sanctions List entry for row: ${JSON.stringify(
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
};