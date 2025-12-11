import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditFraudIncidentsModal from "../../../modals/edit/PSP/EditFraudIncidentsModal";

/* eslint-disable react/prop-types */
const PSPIncidentFraudRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.subCountyCode}</td>
      <td className="border py-2 px-4">{trustAcc.subFraudCode}</td>
      <td className="border py-2 px-4">{trustAcc.fraudCategoryFlag}</td>
      <td className="border py-2 px-4">{trustAcc.victimCategory}</td>
      <td className="border py-2 px-4">{trustAcc.victimInfo}</td>
      <td className="border py-2 px-4">{trustAcc.dateOfOccurence}</td>
      <td className="border py-2 px-4">{trustAcc.numberOfIncidents}</td>
      <td className="border py-2 px-4">{trustAcc.amountInvolved}</td>
      <td className="border py-2 px-4">{trustAcc.amountLost}</td>
      <td className="border py-2 px-4">{trustAcc.amountRecovered}</td>
      <td className="border py-2 px-4">{trustAcc.actionTaken}</td>
      <td className="border py-2 px-4">{trustAcc.recoveryDetails}</td>

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
        <EditFraudIncidentsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-incidents-of-fraud-theft-robbery/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPIncidentFraudRow;
