import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

// Get all Directors
export const getDirectors = async (req, res) => {
  const token = req.cookies?.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const directors = await prisma.director.findMany();

    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Directors!", error });
  }
};

// Get a Director
export const getDirector = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const oneDirector = await prisma.director.findUnique({
      where: { rowId },
    });

    res.status(200).json(oneDirector);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Director!", error });
  }
};

// Create a Director
export const createDirector = async (req, res) => {
  const {
    pspId,
    reportingDate,
    directorName,
    directorGender,
    directorType,
    dateOfBirth,
    nationalityOfDirector,
    residenceOfDirector,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    otherDirectorships,
    dateOfAppointment,
    dateOfRetirement,
    reasonForRetirement,
    disclosureDetails,
  } = req.body;
  // const tokenUserId = req.userId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const newDirector = await prisma.director.create({
      data: {
        pspId,
        reportingDate,
        directorName,
        directorGender,
        directorType,
        dateOfBirth,
        nationalityOfDirector,
        residenceOfDirector,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        otherDirectorships,
        dateOfAppointment,
        dateOfRetirement,
        reasonForRetirement,
        disclosureDetails,
      },
    });

    res.status(201).json(newDirector);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Director!", error });
  }
};

// Update a Director
export const updateDirector = async (req, res) => {
  const rowId = req.params.rowId;
  const {
    pspId,
    reportingDate,
    directorName,
    directorGender,
    directorType,
    dateOfBirth,
    nationalityOfDirector,
    residenceOfDirector,
    idNumber,
    kraPin,
    contact,
    academicQualifications,
    otherDirectorships,
    dateOfAppointment,
    dateOfRetirement,
    reasonForRetirement,
    disclosureDetails,
  } = req.body;

  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    const updatedDirector = await prisma.director.update({
      where: { rowId },
      data: {
        pspId,
        reportingDate,
        directorName,
        directorGender,
        directorType,
        dateOfBirth,
        nationalityOfDirector,
        residenceOfDirector,
        idNumber,
        kraPin,
        contact,
        academicQualifications,
        otherDirectorships,
        dateOfAppointment,
        dateOfRetirement,
        reasonForRetirement,
        disclosureDetails,
      },
    });

    res
      .status(202)
      .json({ message: "Director updated successfully!", updatedDirector });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Director!", error });
  }
};

// Delete a Director
export const deleteDirector = async (req, res) => {
  const rowId = req.params.rowId;
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userTokenUserType = decodedToken.userType;

    if (userTokenUserType !== "legal" && userTokenUserType !== "superAdmin")
      return res.status(500).json({ message: "Not Authorized!" });

    await prisma.director.delete({
      where: { rowId },
    });

    res.status(204).json({ message: "Director deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Director!" });
  }
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete the file:", err);
    }
  });
};

export const createDirectorFromCSV = async (req, res) => {
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
            await prisma.director.create({
              data: {
                pspId: newSplit[0],
                reportingDate: newSplit[1],
                directorName: newSplit[2],
                directorGender: newSplit[3],
                directorType: newSplit[4],
                dateOfBirth: newSplit[5],
                nationalityOfDirector: newSplit[6],
                residenceOfDirector: newSplit[7],
                idNumber: newSplit[8],
                kraPin: newSplit[9],
                contact: newSplit[10],
                academicQualifications: newSplit[11],
                otherDirectorships: newSplit[12],
                dateOfAppointment: newSplit[13],
                dateOfRetirement: newSplit[14],
                reasonForRetirement: newSplit[15],
                disclosureDetails: newSplit[16],
              },
            });
          } catch (error) {
            console.error(
              `Failed to create a Director entry for row: ${JSON.stringify(
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
