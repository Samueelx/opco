import { useState } from "react";

import DeleteModal from "../../../modals/delete/DeleteModal";
import { EditPSPScheduleOfSeniorMgtModal } from "../../..";

/* eslint-disable react/prop-types */
const PSPScheduleOfSeniorMgtRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4 text-nowrap">{trustAcc.officerName}</td>
      <td className="border py-2 px-4 text-center">{trustAcc.officerGender}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.designation}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.dateOfBirth}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.nationalityOfOfficer}
      </td>
      <td className="border py-2 px-4">{trustAcc.idNumber}</td>
      <td className="border py-2 px-4">{trustAcc.kraPin}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.academicQualifications}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.dateOfEmployment}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.employmentType}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.expectedDateOfRetirement}
      </td>
      <td className="border py-2 px-4">{trustAcc.otherAffilliations}</td>
      <td className="border py-2 px-4">{trustAcc.disclosureDetails}</td>

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
        <EditPSPScheduleOfSeniorMgtModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-senior-management/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfSeniorMgtRow;
