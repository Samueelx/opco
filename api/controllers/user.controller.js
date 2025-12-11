import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

// Get a Users
export const getUsers = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        userType: true,
        verified: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users!", error });
  }
};

// Get a User
export const getUser = async (req, res) => {
  const token = req.cookies?.token;
  const id = req.params.id;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        userType: true,
        verified: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get a user!", error });
  }
};

// Update a User
export const updateUser = async (req, res) => {
  const token = req.cookies?.token;
  const id = req.params.id;
  const { verified } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { verified },
      select: {
        id: true,
        email: true,
        username: true,
        userType: true,
        verified: true,
      },
    });

    res.status(202).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update a user!", error });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  const token = req.cookies?.token;
  const id = req.params.id;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user!", error });
  }
};
