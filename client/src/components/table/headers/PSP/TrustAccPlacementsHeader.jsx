const TrustAccPlacementsHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">TRUST_FUND_PLACEMENT</th>
        <th className="border p-4 bg-red-400">TRUST_FUND_INV_MATURITY_DATE</th>
        <th className="border p-4 bg-red-400">CAT_TRUST_FUND_INVESTED_AMT</th>
        <th className="border p-4 bg-red-400">INTEREST_AMOUNT_PER_CATEGORY</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default TrustAccPlacementsHeader;
