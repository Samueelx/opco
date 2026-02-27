import prisma from "../lib/prisma.js";

export const createGeoLocationBorder = async (req, res) => {
  const data = req.body;

  try {
    const formattedData = data.map((item) => ({
      ...item,
      numberOfTransactions: parseInt(item.numberOfTransactions, 10),
      valueOfTransactions: parseFloat(item.valueOfTransactions),
    }));

    const result = await prisma.geoLocationBorder.createMany({
      data: formattedData,
    });

    res.status(201).json({
      message: "Geographical Location Border data created successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error creating Geographical Location Border data:", error);
    res.status(500).json({ message: "Failed to create Geographical Location Border data" });
  }
};

export const getGeoLocationBorder = async (req, res) => {
  try {
    const data = await prisma.geoLocationBorder.findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Geographical Location Border data:", error);
    res.status(500).json({ message: "Failed to fetch Geographical Location Border data" });
  }
};
