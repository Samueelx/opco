const DirectorMgtHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">INSTITUTION_CODE</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400">SEQUENCE_ID</th>
        <th className="border p-4 bg-red-400">NAME</th>
        <th className="border p-4 bg-red-400 text-nowrap">STAFF ID</th>
        <th className="border p-4 bg-red-400">MEMBER TYPE</th>
        <th className="border p-4 bg-red-400">EXECUTIVE_CATEGORY_TYPE</th>
        <th className="border p-4 bg-red-400">GENDER</th>
        <th className="border p-4 bg-red-400">NATIONALITY</th>
        <th className="border p-4 bg-red-400">RESIDENCY</th>
        <th className="border p-4 bg-red-400">ID NO.</th>
        <th className="border p-4 bg-red-400">PASSPORT</th>
        <th className="border p-4 bg-red-400">ACADEMIC_QUALIFICATION</th>
        <th className="border p-4 bg-red-400">PROFESSION</th>
        <th className="border p-4 bg-red-400">CONTACT_NUMBER</th>
        <th className="border p-4 bg-red-400">EMAIL</th>
        <th className="border p-4 bg-red-400">APPOINTMENT_DATE</th>
        <th className="border p-4 bg-red-400">CBK_APPROVAL_DATE</th>
        <th className="border p-4 bg-red-400">BOARD_CHAIR_COMMITTEE</th>
        <th className="border p-4 bg-red-400">BOARD_COMMITTEE_NAME</th>
        <th className="border p-4 bg-red-400">MANAGEMENT_COMMITTEE_NAME</th>
        <th className="border p-4 bg-red-400">COMPANY_NAME</th>
        <th className="border p-4 bg-red-400">ROLE_IN_COMPANY_NAME</th>
        <th className="border p-4 bg-red-400">SHAREHOLDING_FLAG</th>
        <th className="border p-4 bg-red-400">SHAREHOLDING_INFO</th>
        <th className="border p-4 bg-red-400">BANKING_EXPERIENCE</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default DirectorMgtHeader;
