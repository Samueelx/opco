const PSPCybersecurityHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
        <th className="border p-4 bg-red-400">PSP_ID</th>
        <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        <th className="border p-4 bg-red-400 ">INCIDENT_NUMBER</th>
        <th className="border p-4 bg-red-400">LOCATION_OF_ATTACKER</th>
        <th className="border p-4 bg-red-400">INCIDENT_MODE</th>
        <th className="border p-4 bg-red-400">
          DATETIME_OF_INCIDENT_HAPPENNED
        </th>
        <th className="border p-4 bg-red-400">LOSS_TYPE</th>
        <th className="border p-4 bg-red-400">DETAILS_OF_THE_INCIDENT</th>
        <th className="border p-4 bg-red-400">
          ACTION_TAKENTO_MANAGE_INCIDENT
        </th>
        <th className="border p-4 bg-red-400">
          DATETIME_OF_INCIDENT_RESOLUTION
        </th>
        <th className="border p-4 bg-red-400">ACTION_TAKEN_MITIGATE_FUT_INC</th>
        <th className="border p-4 bg-red-400">AMOUNT_INVOLVED</th>
        <th className="border p-4 bg-red-400">AMOUNT_LOST</th>

        <th className="border p-4 bg-red-400">EDIT</th>
        <th className="border p-4 bg-red-400">DELETE</th>
      </tr>
    </thead>
  );
};

export default PSPCybersecurityHeader;
