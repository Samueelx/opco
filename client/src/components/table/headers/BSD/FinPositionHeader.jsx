const FinPositionHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">CRB_MRP_FXB_CODE</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">GL_MAPPING_CODE</th>
        <th className="border p-4 bg-red-400">AMOUNT</th>
        <th className="border p-4 bg-red-400">NO_OF_EMPLOYEES</th>
        <th className="border p-4 bg-red-400">NO_OF_OUTLETS</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default FinPositionHeader;
