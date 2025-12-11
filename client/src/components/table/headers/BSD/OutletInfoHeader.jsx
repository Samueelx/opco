const OutletInfoHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400 text-nowrap">BANK ID</th>
        <th className="border p-4 bg-red-400 text-nowrap">OUTLET ID</th>
        <th className="border p-4 bg-red-400 text-nowrap">REPORTING DATE</th>
        <th className="border p-4 bg-red-400 text-nowrap">TYPE_OF_OUTLET</th>
        <th className="border p-4 bg-red-400 text-nowrap">OUTLET NAME</th>
        <th className="border p-4 bg-red-400 text-nowrap">TOWN</th>
        <th className="border p-4 bg-red-400 text-nowrap">SUB COUNTY CODE</th>
        <th className="border p-4 bg-red-400 text-nowrap">LATITUDE</th>
        <th className="border p-4 bg-red-400 text-nowrap">LONGITUDE</th>
        <th className="border p-4 bg-red-400 text-nowrap">CBK APPROVAL DATE</th>
        <th className="border p-4 bg-red-400 text-nowrap">OUTLET STATUS</th>
        <th className="border p-4 bg-red-400 text-nowrap">OPENING DATE</th>
        <th className="border p-4 bg-red-400 text-nowrap">CLOSING DATE</th>
        <th className="border p-4 bg-red-400 text-nowrap">
          LICENSE FEE PAYABLE
        </th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default OutletInfoHeader;
