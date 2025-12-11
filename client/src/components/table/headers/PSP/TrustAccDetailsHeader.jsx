const TrustAccDetailsHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">BANK_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">BANK_ACCOUNT_NUMBER</th>
        <th className="border p-4 bg-red-400">TRUST_ACC_DR_TYPE_CODE</th>
        <th className="border p-4 bg-red-400">ORG_RECEIVING_DONATION</th>
        <th className="border p-4 bg-red-400">SECTOR_CODE</th>
        <th className="border p-4 bg-red-400">
          TRUST_ACC_INT_UTILIZED_DETAILS
        </th>
        <th className="border p-4 bg-red-400">TRUST_ACC_OPENING_BALANCE</th>
        <th className="border p-4 bg-red-400">PRINCIPAL_AMOUNT</th>
        <th className="border p-4 bg-red-400">TRUST_ACC_INTEREST_EARNED</th>
        <th className="border p-4 bg-red-400">CLOSING_BALANCE</th>
        <th className="border p-4 bg-red-400">TRUST_ACC_INTEREST_UTILIZED</th>
        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default TrustAccDetailsHeader;
