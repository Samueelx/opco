import prisma from "../lib/prisma.js";

export const createCustomerAnalysis = async (req, res) => {
  const data = req.body;

  try {
    const pspId = req.user?.id || req.body[0]?.pspId; // Assuming PSP ID comes from auth or the payload

    const formattedData = data.map((item) => ({
      ...item,
      pspId: item.pspId || pspId, // fallback if not provided per item
      numberOfCustomers: parseInt(item.numberOfCustomers, 10),
      numberOfTransactions: parseInt(item.numberOfTransactions, 10),
      valueOfTransactions: parseFloat(item.valueOfTransactions),
    }));

    const result = await prisma.customerAnalysis.createMany({
      data: formattedData,
    });

    res.status(201).json({
      message: "Customer Analysis data created successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error creating Customer Analysis data:", error);
    res.status(500).json({ message: "Failed to create Customer Analysis data" });
  }
};

export const getCustomerAnalysis = async (req, res) => {
  try {
    const analysisData = await prisma.customerAnalysis.findMany();
    res.status(200).json(analysisData);
  } catch (error) {
    console.error("Error fetching Customer Analysis data:", error);
    res.status(500).json({ message: "Failed to fetch Customer Analysis data" });
  }
};
