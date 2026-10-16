import prisma from "./lib/prisma.js";
import {
  getSubCountyCode,
  getVictimCategoryCode,
  getFraudCategoryCode,
  getSubFraudCode,
} from "./utils/cbkMappings.js";

const migrateFromCreatedAt = async () => {
  // Set the cutoff date to midnight on April 16, 2026 (UTC)
  const CUTOFF_DATE = new Date("2026-04-16T00:00:00.000Z");
  console.log(`Starting data sanitization for records created on or after: ${CUTOFF_DATE.toISOString()}...`);

  try {
    // Prisma filters DateTime fields directly at the database level
    const incidents = await prisma.fraudIncident.findMany({
      where: {
        createdAt: {
          gte: CUTOFF_DATE,
        },
      },
    });

    console.log(`Found ${incidents.length} records created on or after the cutoff date.`);

    let updatedCount = 0;

    for (const incident of incidents) {
      const newSubCountyCode = getSubCountyCode(incident.subCountyCode);
      const newSubFraudCode = getSubFraudCode(incident.subFraudCode);
      const newFraudCategoryFlag = getFraudCategoryCode(incident.fraudCategoryFlag);
      const newVictimCategory = getVictimCategoryCode(incident.victimCategory);

      if (
        incident.subCountyCode !== newSubCountyCode ||
        incident.subFraudCode !== newSubFraudCode ||
        incident.fraudCategoryFlag !== newFraudCategoryFlag ||
        incident.victimCategory !== newVictimCategory
      ) {
        await prisma.fraudIncident.update({
          where: { rowId: incident.rowId },
          data: {
            subCountyCode: newSubCountyCode,
            subFraudCode: newSubFraudCode,
            fraudCategoryFlag: newFraudCategoryFlag,
            victimCategory: newVictimCategory,
          },
        });
        updatedCount++;
      }
    }

    console.log(`✅ Completed. Updated ${updatedCount} records.`);
  } catch (error) {
    console.error("❌ Migration error:", error);
  } finally {
    await prisma.$disconnect();
  }
};

migrateFromCreatedAt();