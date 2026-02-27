import prisma from "../lib/prisma.js";

export const createGeoLocationCountry = async (req, res) => {
  const data = req.body;

  try {
    const formattedData = data.map((item) => ({
      ...item,
      numberOfInflows: parseInt(item.numberOfInflows, 10),
      valueOfInflows: parseFloat(item.valueOfInflows),
      numberOfOutflows: parseInt(item.numberOfOutflows, 10),
      valueOfOutflows: parseFloat(item.valueOfOutflows),
    }));

    const result = await prisma.geoLocationCountry.createMany({
      data: formattedData,
    });

    res.status(201).json({
      message: "Geographical Location Country data created successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error creating Geographical Location Country data:", error);
    res.status(500).json({ message: "Failed to create Geographical Location Country data" });
  }
};

export const getGeoLocationCountry = async (req, res) => {
  try {
    const data = await prisma.geoLocationCountry.findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Geographical Location Country data:", error);
    res.status(500).json({ message: "Failed to fetch Geographical Location Country data" });
  }
};
