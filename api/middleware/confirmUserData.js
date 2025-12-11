import prisma from "../lib/prisma.js";

export const confirmUserData = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user.verified)
      return res.status(401).json({ message: "User is not verified!" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({
        message: "User account not verified! Contact your administrator.",
      });
  }
};
