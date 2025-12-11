import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate, formatDate2 } from "../lib/utils.js";
import { parseAmount } from "../utils/utils.js";

// Get all Customer Complaints
export const getCustomerComplaints = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const customerComplaints = await prisma.customerComplaint.findMany();

    res.status(200).json(customerComplaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Customer Complaints!", error });
  }
};

// Get unique reporting dates
export const getUniqueReportingDates = async (req, res) => {
  const token = req.cookies?.token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const uniqueDates = await prisma.customerComplaint.findMany({
      distinct: ['reportingDate'],
      select: {
        reportingDate: true
      }
    })

    res.status(200).json(uniqueDates)
  } catch (error) {
    res.status(500).json({message: "Failed to fetch unique reporting dates!", error})
  }
}

// Get a Customer Complaint
export const getCustomerComplaint = async (req, res) => {
  const date = req.params.reportingDate;
  const token = req.cookies?.token;

  const reportingDate = date.split("-").join("/")

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const oneCustomerComplaint = await prisma.customerComplaint.findMany({
      where: { reportingDate },
    });

    res.status(200).json(oneCustomerComplaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Customer Complaint!", error });
  }
};

// Create a Customer Complaint
export const createCustomerComplaint = async (req, res) => {
  const {
    pspId,
    reportingDate,
    complaintID,
    code,
    gender,
    frequency,
    name,
    age,
    contact,
    subCounty,
    education,
    otherDetails,
    agentId,
    dateOfOccurrence,
    dateReported,
    dateResolved,
    remedialStatus,
    amountLost,
    amountRecovered,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newCustomerComplaint = await prisma.customerComplaint.create({
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        complaintID,
        code,
        gender,
        frequency,
        name,
        age: parseInt(age),
        contact,
        subCounty,
        education,
        otherDetails,
        agentId,
        dateOfOccurrence: formatDate(dateOfOccurrence),
        dateReported: formatDate(dateReported),
        dateResolved: formatDate(dateResolved),
        remedialStatus,
        amountLost: parseAmount(amountLost),
        amountRecovered: parseAmount(amountRecovered),
      },
    });

    res.status(201).json(newCustomerComplaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a Customer Complaint!", error });
  }
};

// Update a Customer Complaint
export const updateCustomerComplaint = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    complaintID,
    code,
    gender,
    frequency,
    name,
    age,
    contact,
    subCounty,
    education,
    otherDetails,
    agentId,
    dateOfOccurrence,
    dateReported,
    dateResolved,
    remedialStatus,
    amountLost,
    amountRecovered,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedCustomerComplaint = await prisma.customerComplaint.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate: formatDate(reportingDate),
        complaintID,
        code,
        gender,
        frequency,
        name,
        age: parseInt(age),
        contact,
        subCounty,
        education,
        otherDetails,
        agentId,
        dateOfOccurrence: formatDate(dateOfOccurrence),
        dateReported: formatDate(dateReported),
        dateResolved: formatDate(dateResolved),
        remedialStatus,
        amountLost: parseAmount(amountLost),
        amountRecovered: parseAmount(amountRecovered),
      },
    });

    res.status(202).json(updatedCustomerComplaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update a Customer Complaint!", error });
  }
};

// Delete a Customer Complaint
export const deleteCustomerComplaint = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.customerComplaint.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Customer Complaint deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Customer Complaint!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createCustomerComplaintFromCSV = async (req, res) => {
  const filePath = path.resolve(req.file.path);
  const token = req.cookies?.token;

  console.log(`File path on Customer complaint: ${filePath}`); // Debugging line to log file path

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return res.status(400).json({ message: "File not found!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "cx" && userTokenUserType !== "superAdmin")
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
            await prisma.customerComplaint.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                complaintID: newSplit[2],
                code: newSplit[3],
                gender: newSplit[4],
                frequency: newSplit[5],
                name: newSplit[6],
                age: newSplit[7] ? parseInt(newSplit[7]) : "",
                contact: newSplit[8],
                subCounty: newSplit[9],
                education: "",
                otherDetails: newSplit[11],
                agentId: newSplit[12],
                dateOfOccurrence: formatDate2(newSplit[13]),
                dateReported: formatDate2(newSplit[14]),
                dateResolved: newSplit[15] ? formatDate2(newSplit[15]) : "",
                remedialStatus: newSplit[16],
                amountLost: parseAmount(newSplit[17]),
                amountRecovered: parseAmount(newSplit[18]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Customer Complaint entry for row: ${JSON.stringify(
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
