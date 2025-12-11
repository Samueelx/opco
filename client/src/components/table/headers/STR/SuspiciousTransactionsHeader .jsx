const SuspiciousTransactionsHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">TRANSACTION_FLAG</th>
        <th className="border p-4 bg-red-400">NUMBER_OF_ML_RELATED_STRs_REPORTED</th>
        <th className="border p-4 bg-red-400">NUMBER_OF_TF_RELATED_STRs_REPORTED</th>
        <th className="border p-4 bg-red-400">NUMBER_OF_PF_RELATED_STRs_REPORTED</th>
        <th className="border p-4 bg-red-400">NO_OF_TRANSACTIONS_ABOVE_USD_15000</th>
        <th className="border p-4 bg-red-400">TOTAL_VALUE_OF_TRANSACTIONS_ABOVE_USD_15000_IN_KSH_000</th>
        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default SuspiciousTransactionsHeader;