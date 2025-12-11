import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

export const getBandCodes = async (req, res) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "marketing" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const bandCodes = await prisma.tariff.findMany();
    res.status(200).json(bandCodes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Tariff!",
      error,
    });
  }
};

// Get a Counterfeit Currency Fraud
export const getBandCode = async (req, res) => {
  const id = req.params.id;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "marketing" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const bandCode = await prisma.tariff.findUnique({
      where: { id },
    });

    res.status(200).json(JSON.parse(bandCode.tariff));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tariff!", error });
  }
};

// Delete band code
export const deleteTariff = async (req, res) => {
  const id = req.params.id;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "marketing" && userTokenUserType !== "superAdmin")
      return res.status(403).json({ message: "Not Authorized!" });

    const existingTariff = await prisma.tariff.findUnique({
      where: {id},
    });

    if (!existingTariff) {
      return res.status(404).json({message: "Tariff not found"})
    }

    await prisma.tariff.delete({
      where: {id}
    })

    res.status(200).json({message: "Tariff deleted successfully"});
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({message: "Invalid token"})
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({message: "Token expired"})
    }

    console.error("Delete tariff error: ", error)
    res.status(500).json({
      message: "Failed to create a Tariff!",
      error: error.message,
    });
  }
}

// Create band codes from csv
export const createBandCodesFromCSV = async (req, res) => {
  const { reportingDate, tariff } = req.body;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "marketing" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newTariff = await prisma.tariff.create({
      data: {
        reportingDate,
        tariff,
      },
    });

    res.status(201).json(newTariff);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a Tariff!",
      error,
    });
  }
};
