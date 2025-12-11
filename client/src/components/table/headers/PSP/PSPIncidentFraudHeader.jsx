const PSPIncidentFraudHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">SUB_COUNTY_CODE</th>
        <th className="border p-4 bg-red-400">SUB_FRAUD_CODE</th>
        <th className="border p-4 bg-red-400">FRAUD_CATEGORY_FLAG</th>
        <th className="border p-4 bg-red-400">VICTIM_CATEGORY</th>
        <th className="border p-4 bg-red-400">VICTIM_INFORMATION</th>
        <th className="border p-4 bg-red-400">DATE_OF_OCCURRENCE</th>
        <th className="border p-4 bg-red-400">NUMBER_OF_INCIDENCES</th>
        <th className="border p-4 bg-red-400">AMOUNT_INVOLVED</th>
        <th className="border p-4 bg-red-400">AMOUNT_LOST</th>
        <th className="border p-4 bg-red-400">AMOUNT_RECOVERED</th>
        <th className="border p-4 bg-red-400">ACTION_TAKEN</th>
        <th className="border p-4 bg-red-400">RECOVERY_DETAILS</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default PSPIncidentFraudHeader;
