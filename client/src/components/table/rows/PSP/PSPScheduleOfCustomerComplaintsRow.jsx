import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditPSPScheduleOfCustomerComplaintsModal from "../../../modals/edit/PSP/EditPSPScheduleOfCustomerComplaintsModal";

/* eslint-disable react/prop-types */
const PSPScheduleOfCustomerComplaintsRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4 text-nowrap">{trustAcc.code}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.gender}</td>
      <td className="border py-2 px-4">{trustAcc.frequency}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.name}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.age}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.contact}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.subCounty}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.education}</td>
      <td className="border py-2 px-4">{trustAcc.otherDetails}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.agentId}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.dateOfOccurrence}
      </td>
      <td className="border py-2 px-4 text-center">{trustAcc.dateReported}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.dateResolved}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.remedialStatus}
      </td>
      <td className="border py-2 px-4 text-center">{trustAcc.amountLost}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.amountRecovered}
      </td>

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
        <EditPSPScheduleOfCustomerComplaintsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-customer-complaints-&-remedial-actions/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfCustomerComplaintsRow;
