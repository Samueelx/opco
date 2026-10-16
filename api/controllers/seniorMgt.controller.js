import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";

// Get all Senior Mgts
export const getSeniorMgts = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const seniorManagers = await prisma.seniorMgt.findMany();

    res.status(200).json(seniorManagers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Senior Mgts!", error });
  }
};

// Get a Senior Mgt
export const getSeniorMgt = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const seniorManager = await prisma.seniorMgt.findUnique({
      where: { rowId },
    });

    res.status(200).json(seniorManager);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Director!", error });
  }
};

// Create a Senior Mgt
export const createSeniorMgt = async (req, res) => {
  const {
    pspId,
    reportingDate,
    officerName,
    officerGender,
    designation,
    dateOfBirth,
    nationalityOfOfficer,
    idNumber,
    kraPin,
    academicQualifications,
    dateOfEmployment,
    employmentType,
    expectedDateOfRetirement,
    otherAffiliations,
    disclosureDetails,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newSeniorManager = await prisma.seniorMgt.create({
      data: {
        pspId,
        reportingDate,
        officerName,
        officerGender,
        designation,
        dateOfBirth,
        nationalityOfOfficer,
        idNumber,
        kraPin,
        academicQualifications,
        dateOfEmployment,
        employmentType,
        expectedDateOfRetirement,
        otherAffiliations,
        disclosureDetails,
      },
    });

    res.status(201).json(newSeniorManager);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create Senior Manager!", error });
  }
};

// Update a Senior Mgt
export const updateSeniorMgt = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    officerName,
    officerGender,
    designation,
    dateOfBirth,
    nationalityOfOfficer,
    idNumber,
    kraPin,
    academicQualifications,
    dateOfEmployment,
    employmentType,
    expectedDateOfRetirement,
    otherAffiliations,
    disclosureDetails,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedSeniorManager = await prisma.seniorMgt.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        officerName,
        officerGender,
        designation,
        dateOfBirth,
        nationalityOfOfficer,
        idNumber,
        kraPin,
        academicQualifications,
        dateOfEmployment,
        employmentType,
        expectedDateOfRetirement,
        otherAffiliations,
        disclosureDetails,
      },
    });

    res.status(202).json({
      message: "Senior Mgt updated successfully!",
      updatedSeniorManager,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Senior Mgt!", error });
  }
};

// Delete a Director
export const deleteSeniorMgt = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.seniorMgt.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Senior Mgt deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Senior Mgt!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createSeniorMgtFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "am" && userTokenUserType !== "superAdmin")
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
            await prisma.seniorMgt.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                officerName: newSplit[2],
                officerGender: newSplit[3],
                designation: newSplit[4],
                dateOfBirth: newSplit[5],
                nationalityOfOfficer: newSplit[6],
                idNumber: newSplit[7],
                kraPin: newSplit[8],
                academicQualifications: newSplit[9],
                dateOfEmployment: newSplit[10],
                employmentType: newSplit[11],
                expectedDateOfRetirement: newSplit[12],
                otherAffiliations: newSplit[13],
                disclosureDetails: newSplit[14],
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Senior Management entry for row: ${JSON.stringify(
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
