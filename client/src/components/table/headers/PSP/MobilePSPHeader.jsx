const MobilePSPHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">SUB_COUNTY_CODE</th>
        <th className="border p-4 bg-red-400">AGENT_ID</th>
        <th className="border p-4 bg-red-400">DENOMINATION_CODE</th>
        <th className="border p-4 bg-red-400">SERIAL_NO</th>
        <th className="border p-4 bg-red-400">DEPOSITOR</th>
        <th className="border p-4 bg-red-400">TELLER</th>
        <th className="border p-4 bg-red-400">DATE_CONFISCATED</th>
        <th className="border p-4 bg-red-400">DATE_SUBMITTED</th>
        <th className="border p-4 bg-red-400">REMARKS</th>
        <th className="border p-4 bg-red-400">PIECES</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default MobilePSPHeader;
