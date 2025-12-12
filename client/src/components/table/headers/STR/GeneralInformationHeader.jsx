const GeneralInformationHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">TOTAL_NUMBER_OF_STAFF</th>
        <th className="border p-4 bg-red-400">COMPLIANCE_STAFF_AML_TF_PF</th>
        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default GeneralInformationHeader;