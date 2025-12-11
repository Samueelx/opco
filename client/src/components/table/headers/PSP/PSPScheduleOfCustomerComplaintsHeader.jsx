const PSPScheduleOfCustomerComplaintsHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400 text-nowrap">COMPLAINT CODE</th>
        <th className="border p-4 bg-red-400">GENDER</th>
        <th className="border p-4 bg-red-400">FREQUENCY</th>
        <th className="border p-4 bg-red-400 text-nowrap">NAME</th>
        <th className="border p-4 bg-red-400">AGE</th>
        <th className="border p-4 bg-red-400 text-nowrap">CONTACT NUMBER</th>
        <th className="border p-4 bg-red-400 text-nowrap">
          SUB COUNTY LOCATION
        </th>
        <th className="border p-4 bg-red-400 text-nowrap">EDUCATION LEVEL</th>
        <th className="border p-4 bg-red-400 text-nowrap">OTHER DETAILS</th>
        <th className="border p-4 bg-red-400 text-nowrap">AGENT ID</th>
        <th className="border p-4 bg-red-400 text-nowrap">
          DATE OF OCCURRENCE
        </th>
        <th className="border p-4 bg-red-400 text-nowrap">DATE REPORTED</th>
        <th className="border p-4 bg-red-400 text-nowrap">DATE RESOLVED</th>
        <th className="border p-4 bg-red-400 text-nowrap">REMEDIAL STATUS</th>
        <th className="border p-4 bg-red-400 text-nowrap">AMOUNT LOST</th>
        <th className="border p-4 bg-red-400 text-nowrap">AMOUNT RECOVERED</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default PSPScheduleOfCustomerComplaintsHeader;
