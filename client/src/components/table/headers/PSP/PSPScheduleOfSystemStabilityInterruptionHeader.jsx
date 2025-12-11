const PSPScheduleOfSystemStabilityInterruptionHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">SUB_COUNTY_CODE</th>
        <th className="border p-4 bg-red-400">SYSTEM_OWNER_TAG</th>
        <th className="border p-4 bg-red-400">3RD_PARTY_OWNED_CATEGORY</th>
        <th className="border p-4 bg-red-400">3RD_PARTY_NAME</th>
        <th className="border p-4 bg-red-400">PRODUCT_TYPE</th>
        <th className="border p-4 bg-red-400">
          SYSTEM_UNAVAILABILITY_TYPE_CODE
        </th>
        <th className="border p-4 bg-red-400">
          NAME_OF_3RD_PARTY_SYSTEM_AFFECTED
        </th>
        <th className="border p-4 bg-red-400">
          SERVICE_INTERRUPTION_CAUSE_CODE
        </th>
        <th className="border p-4 bg-red-400">SEVERITY_OF_INTERRUPTION_CODE</th>
        <th className="border p-4 bg-red-400">RECOVERY_TIME_CODE</th>
        <th className="border p-4 bg-red-400">REMEDIAL_STATUS_CODE</th>
        <th className="border p-4 bg-red-400">SYSTEM_UPTIME_PERCENTAGE</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default PSPScheduleOfSystemStabilityInterruptionHeader;
