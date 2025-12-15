const UNSanctionsListHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">TYPE_OF_TRANSACTION</th>
        <th className="border p-4 bg-red-400">TYPE_OF_ACCOUNT</th>
        <th className="border p-4 bg-red-400">NAME_IN_UNSC_LIST</th>
        <th className="border p-4 bg-red-400">ACCOUNT_NAME</th>
        <th className="border p-4 bg-red-400">ACCOUNT_NUMBER</th>
        <th className="border p-4 bg-red-400">FINANCIAL_INSTITUTION</th>
        <th className="border p-4 bg-red-400">INSTITUTIONS_INVOLVED</th>
        <th className="border p-4 bg-red-400">COUNTRIES_INVOLVED</th>
        <th className="border p-4 bg-red-400">AMOUNT_KSH_000</th>
        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default UNSanctionsListHeader;