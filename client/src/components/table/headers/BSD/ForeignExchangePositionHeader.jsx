const ForeignExchangePositionHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">INSTITUTION_CODE</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">CURRENCY_TYPE_CODE</th>
        <th className="border p-4 bg-red-400">KES_SPOT_RATE</th>
        <th className="border p-4 bg-red-400">OPENING_POSITION_AMOUNT</th>
        <th className="border p-4 bg-red-400">TOTAL_INFLOWS_AMOUNT</th>
        <th className="border p-4 bg-red-400">OTHER_TOTAL_INFLOWS_AMOUNT</th>
        <th className="border p-4 bg-red-400">TOTAL_OUTFLOWS_AMOUNT</th>
        <th className="border p-4 bg-red-400">OTHER_TOTAL_OUTFLOWS_AMOUNT</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default ForeignExchangePositionHeader;
