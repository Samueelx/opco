import { useState } from "react";

import DeleteModal from "../../../modals/delete/DeleteModal";
import { convertCustomToStandard, formatDateTime } from "../../../../lib/formatDatetime";
import EditPSPCybersecurityModal from "../../../modals/edit/PSP/EditPSPCybersecurityModal";

/* eslint-disable react/prop-types */
const PSPCybersecurityRow = ({ trustAcc, onRecordAdded }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openDeleteModalModal() {
    setIsDeleteModalOpen(true);
  }

  return (
    <tr className="even:bg-[#f2f2f2] hover:bg-[#ddd]">
      {/* <td className="border py-2 px-4">{trustAcc.rowId}</td> */}
      <td className="border py-2 px-4">{trustAcc.pspId}</td>
      <td className="border py-2 px-4">{trustAcc.reportingDate}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.incidentNumber}</td>
      <td className="border py-2 px-4">{trustAcc.locationOfAttacker}</td>
      <td className="border py-2 px-4">{trustAcc.incidentMode}</td>
      <td className="border py-2 px-4">
        {convertCustomToStandard(trustAcc.datetimeOfIncident)}
      </td>
      <td className="border py-2 px-4">{trustAcc.lossType}</td>
      <td className="border py-2 px-4">{trustAcc.detailsOfIncident}</td>
      <td className="border py-2 px-4">
        {trustAcc.actionTakenToManageIncident}
      </td>
      <td className="border py-2 px-4">
        {convertCustomToStandard(trustAcc.datetimeOfIncidentResolution)}
      </td>
      <td className="border py-2 px-4">
        {trustAcc.actionTakenToMitigateIncident}
      </td>
      <td className="border py-2 px-4">{trustAcc.amountInvolved}</td>
      <td className="border py-2 px-4">{trustAcc.amountLost}</td>

      <td className="border py-2 text-center">
        <button
          type="button"
          className="bg-gray-400 border-none px-2.5 rounded text-white"
          onClick={() => openModal("add")}
        >
          Edit
        </button>
      </td>

      <td className="border py-2 text-center">
        <button
          type="button"
          className="bg-red-400 border-none px-2.5 rounded text-white"
          onClick={openDeleteModalModal}
        >
          Delete
        </button>
        <EditPSPCybersecurityModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-cybersecurity-incident-record/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPCybersecurityRow;
