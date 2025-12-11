import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import prisma from "../lib/prisma.js";
import { parseAmount } from "../utils/utils.js";

// Get all Outlets Information
export const getOutletInfos = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const outletInfos = await prisma.outletInfo.findMany();

    res.status(200).json(outletInfos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Outlets Information!", error });
  }
};

// Get an Outlet Information
export const getOutletInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const outletInfo = await prisma.outletInfo.findUnique({
      where: { rowId },
    });

    res.status(200).json(outletInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Outlet Information!", error });
  }
};

// Create an Outlet Information
export const createOutletInfo = async (req, res) => {
  const {
    bankId,
    outletId,
    reportingDate,
    typeOfOutlet,
    outletName,
    town,
    subCountyCode,
    latitude,
    longitude,
    cbkApprovalDate,
    outletStatus,
    openingDate,
    closureDate,
    licenseFeePayable,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newOutletInfo = await prisma.outletInfo.create({
      data: {
        bankId,
        outletId,
        reportingDate,
        typeOfOutlet,
        outletName,
        town,
        subCountyCode,
        latitude: parseAmount(latitude),
        longitude: parseAmount(longitude),
        cbkApprovalDate,
        outletStatus,
        openingDate,
        closureDate,
        licenseFeePayable: parseAmount(licenseFeePayable),
      },
    });

    res.status(201).json(newOutletInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Outlet Information!",
      error,
    });
  }
};

// Update an Outlet Information
export const updateOutletInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    bankId,
    outletId,
    reportingDate,
    typeOfOutlet,
    outletName,
    town,
    subCountyCode,
    latitude,
    longitude,
    cbkApprovalDate,
    outletStatus,
    openingDate,
    closureDate,
    licenseFeePayable,
  } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedOutletInfo = await prisma.outletInfo.update({
      where: { rowId },
      data: {
        bankId,
        outletId,
        reportingDate,
        typeOfOutlet,
        outletName,
        town,
        subCountyCode,
        latitude: parseAmount(latitude),
        longitude: parseAmount(longitude),
        cbkApprovalDate,
        outletStatus,
        openingDate,
        closureDate,
        licenseFeePayable: parseAmount(licenseFeePayable),
      },
    });

    res.status(202).json(updatedOutletInfo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update a Outlet Information!",
      error,
    });
  }
};

// Delete an Outlet Information
export const deleteOutletInfo = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.outletInfo.delete({
      where: { rowId },
    });

    res
      .status(204)
      .json({ message: "Outlet Information deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Outlet Information!", error });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createOutletInfoFromCSV = async (req, res) => {
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

    if (userTokenUserType !== "imt" && userTokenUserType !== "superAdmin")
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
            await prisma.outletInfo.create({
              data: {
                bankId: newSplit[0],
                outletId: newSplit[1],
                reportingDate: newSplit[2],
                typeOfOutlet: newSplit[3],
                outletName: newSplit[4],
                town: newSplit[5],
                subCountyCode: newSplit[6],
                latitude: parseAmount(newSplit[7]),
                longitude: parseAmount(newSplit[8]),
                cbkApprovalDate: newSplit[9],
                outletStatus: newSplit[10],
                openingDate: newSplit[11],
                closureDate: newSplit[12],
                licenseFeePayable: parseAmount(newSplit[13]),
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Outlet Information entry for row: ${JSON.stringify(
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
