const ShareholdersInfoHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">BANK_CODE</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">SHAREHOLDER_SEQUENCE</th>
        <th className="border p-4 bg-red-400">SHAREHOLDER_NAME</th>
        <th className="border p-4 bg-red-400">GENDER</th>
        <th className="border p-4 bg-red-400">TYPE_OF_SHAREHOLDER</th>
        <th className="border p-4 bg-red-400">DOB_OR_REG_DATE</th>
        <th className="border p-4 bg-red-400">NATIONALITY</th>
        <th className="border p-4 bg-red-400">RESIDENCY</th>
        <th className="border p-4 bg-red-400">ID NO.</th>
        <th className="border p-4 bg-red-400">ADDRESS</th>
        <th className="border p-4 bg-red-400">CONTACT_NUMBER</th>
        <th className="border p-4 bg-red-400">MAJOR_PROMOTER</th>
        <th className="border p-4 bg-red-400">SUBSCRIBED_SHARES</th>
        <th className="border p-4 bg-red-400">SHARE_VALUE</th>
        <th className="border p-4 bg-red-400">TOTAL_SHAREHOLDING_AMOUNT</th>
        <th className="border p-4 bg-red-400">PAID_UP_SHARES</th>
        <th className="border p-4 bg-red-400">PERCENTAGE_OF_SHARE</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default ShareholdersInfoHeader;
