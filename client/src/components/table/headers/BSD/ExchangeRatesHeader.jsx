const ExchangeRatesHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">INSTITUTION_CODE</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">CURRENCY_CODE</th>
        <th className="border p-4 bg-red-400">BUYING_RATE</th>
        <th className="border p-4 bg-red-400">SELLING_RATE</th>
        <th className="border p-4 bg-red-400">MEAN_RATE</th>
        <th className="border p-4 bg-red-400">CLOSING_BID_RATE</th>
        <th className="border p-4 bg-red-400">CLOSING_OFFER_RATE</th>
        <th className="border p-4 bg-red-400">USD_CROSS_RATE</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default ExchangeRatesHeader;
