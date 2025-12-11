import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { formatDate } from "../lib/utils.js";

// Get all Director Management Infos
export const getDirectorManagements = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const directorManagementInfos =
      await prisma.directorManagementInfo.findMany();

    res.status(200).json(directorManagementInfos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Director Management Infos!", error });
  }
};

// Get a Director Management Info
export const getDirectorManagement = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const singleDirectorManagementInfo =
      await prisma.directorManagementInfo.findUnique({
        where: { rowId },
      });

    res.status(200).json(singleDirectorManagementInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Director Management Info!", error });
  }
};

// Create a Director Management Info
export const createDirectorManagement = async (req, res) => {
  const {
    institutionCode,
    reportingDate,
    sequenceId,
    nameOfDirector,
    staffId,
    memberType,
    executiveCatType,
    gender,
    nationality,
    residency,
    identificationNumber,
    passportNumber,
    dob,
    academicQualification,
    profession,
    contactNumber,
    email,
    appointmentDate,
    cbkApprovalDate,
    boardChairCommittee,
    boardCommitteeName,
    managementCommitteeName,
    companyName,
    roleInCompany,
    shareholdingFlag,
    shareholdingInfo,
    bankingExperience,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newDirectorManagementInfo =
      await prisma.directorManagementInfo.create({
        data: {
          institutionCode,
          reportingDate: formatDate(reportingDate),
          sequenceId,
          nameOfDirector,
          staffId,
          memberType,
          executiveCatType,
          gender,
          nationality,
          residency,
          identificationNumber,
          passportNumber,
          dob,
          academicQualification,
          profession,
          contactNumber,
          email,
          appointmentDate,
          cbkApprovalDate,
          boardChairCommittee,
          boardCommitteeName,
          managementCommitteeName,
          companyName,
          roleInCompany,
          shareholdingFlag,
          shareholdingInfo,
          bankingExperience: parseInt(bankingExperience),
        },
      });

    res.status(201).json(newDirectorManagementInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Director Management Info!",
      error,
    });
  }
};

// Update a Director Management Info
export const updateDirectorManagement = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    institutionCode,
    reportingDate,
    sequenceId,
    nameOfDirector,
    staffId,
    memberType,
    executiveCatType,
    gender,
    nationality,
    residency,
    identificationNumber,
    passportNumber,
    dob,
    academicQualification,
    profession,
    contactNumber,
    email,
    appointmentDate,
    cbkApprovalDate,
    boardChairCommittee,
    boardCommitteeName,
    managementCommitteeName,
    companyName,
    roleInCompany,
    shareholdingFlag,
    shareholdingInfo,
    bankingExperience,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedDirectorManagementInfo =
      await prisma.directorManagementInfo.update({
        where: { rowId },
        data: {
          institutionCode,
          reportingDate: formatDate(reportingDate),
          sequenceId,
          nameOfDirector,
          staffId,
          memberType,
          executiveCatType,
          gender,
          nationality,
          residency,
          identificationNumber,
          passportNumber,
          dob,
          academicQualification,
          profession,
          contactNumber,
          email,
          appointmentDate,
          cbkApprovalDate,
          boardChairCommittee,
          boardCommitteeName,
          managementCommitteeName,
          companyName,
          roleInCompany,
          shareholdingFlag,
          shareholdingInfo,
          bankingExperience: parseInt(bankingExperience),
        },
      });

    res.status(202).json(updatedDirectorManagementInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Director Management Info!",
      error,
    });
  }
};

// Delete a Director Management Info
export const deleteDirectorManagement = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.directorManagementInfo.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Director Management Info deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Director Management Info!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createDirectorManagementFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
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
            await prisma.directorManagementInfo.create({
              data: {
                institutionCode: newSplit[0],
                reportingDate: newSplit[1],
                sequenceId: newSplit[2],
                nameOfDirector: newSplit[3],
                staffId: newSplit[4],
                memberType: newSplit[5],
                executiveCatType: newSplit[6],
                gender: newSplit[7],
                nationality: newSplit[8],
                residency: newSplit[9],
                identificationNumber: newSplit[10],
                passportNumber: newSplit[11],
                dob: newSplit[12],
                academicQualification: newSplit[13],
                profession: newSplit[14],
                contactNumber: newSplit[15],
                email: newSplit[16],
                appointmentDate: newSplit[17],
                cbkApprovalDate: newSplit[18],
                boardChairCommittee: newSplit[19],
                boardCommitteeName: newSplit[20],
                managementCommitteeName: newSplit[21],
                companyName: newSplit[22],
                roleInCompany: newSplit[23],
                shareholdingFlag: newSplit[24],
                shareholdingInfo: newSplit[25],
                bankingExperience: parseInt(newSplit[26]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Director Management Info entry for row: ${JSON.stringify(
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
