import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditPSPScheduleOfShareholdersModal from "../../../modals/edit/PSP/EditPSPScheduleOfShareholdersModal";

/* eslint-disable react/prop-types */
const PSPScheduleOfShareholdersRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.shareholderName}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.shareholderGender}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.shareholderType}
      </td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.dateOfBirth}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.nationalityOfShareholder}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.residenceOfShareholder}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.countryOfIncorporation}
      </td>
      <td className="border py-2 px-4">{trustAcc.idNumber}</td>
      <td className="border py-2 px-4">{trustAcc.kraPin}</td>
      <td className="border py-2 px-4">{trustAcc.contact}</td>
      <td className="border py-2 px-4">{trustAcc.academicQualifications}</td>
      <td className="border py-2 px-4">{trustAcc.previousEmployment}</td>
      <td className="border py-2 px-4">{trustAcc.dateBecameShareholder}</td>
      <td className="border py-2 px-4">{trustAcc.numberOfShareHeld}</td>
      <td className="border py-2 px-4">{trustAcc.shareValue}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.percentageOfShare}%
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
        <EditPSPScheduleOfShareholdersModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-shareholders/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfShareholdersRow;
