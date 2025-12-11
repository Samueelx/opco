import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

export const signup = async (req, res) => {
  const { email, password, username, userType } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        userType,
        password: hashedPassword,
      },
    });

    const { password: userPassword, ...userInfo } = newUser;

    res
      .status(201)
      .json({ message: "User created successfully!", userData: userInfo });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user!", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email/Password!" });
    }

    const tokenAge = 1000 * 60 * 60 * 24; // 1 day

    const token = jwt.sign(
      { id: user.id, userType: user.userType, verified: user.verified },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: tokenAge
      }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: tokenAge,
        sameSite:"lax"
      })
      .status(200)
      .json({ message: "Logged in successfully!", userData: userInfo });
  } catch (error) {
    res.status(500).json({ message: "Email/Password Incorrect!", error });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "User logged out successfully!" });
};
