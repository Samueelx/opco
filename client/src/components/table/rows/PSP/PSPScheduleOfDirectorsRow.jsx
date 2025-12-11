import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditPSPScheduleOfDirectorsModal from "../../../modals/edit/PSP/EditPSPScheduleOfDirectorsModal";

/* eslint-disable react/prop-types */
const PSPScheduleOfDirectorsRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4 text-nowrap">{trustAcc.directorName}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.directorGender}
      </td>
      <td className="border py-2 px-4">{trustAcc.directorType}</td>
      <td className="border py-2 px-4">{trustAcc.dateOfBirth}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.nationalityOfDirector}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.residenceOfDirector}
      </td>
      <td className="border py-2 px-4">{trustAcc.idNumber}</td>
      <td className="border py-2 px-4">{trustAcc.kraPin}</td>
      <td className="border py-2 px-4">{trustAcc.contact}</td>
      <td className="border py-2 px-4">{trustAcc.academicQualifications}</td>
      <td className="border py-2 px-4">{trustAcc.otherDirectorships}</td>
      <td className="border py-2 px-4">{trustAcc.dateOfAppointment}</td>
      <td className="border py-2 px-4">{trustAcc.dateOfRetirement}</td>
      <td className="border py-2 px-4">{trustAcc.reasonForRetirement}</td>
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
        <EditPSPScheduleOfDirectorsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-directors/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfDirectorsRow;
