import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditPSPScheduleOfTrusteesModal from "../../../modals/edit/PSP/EditPSPScheduleOfTrusteesModal";

/* eslint-disable react/prop-types */
const PSPScheduleOfTrusteesRow = ({ trustAcc, onRecordAdded }) => {
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
        {trustAcc.trustCompanyName}
      </td>
      <td className="border py-2 px-4 text-nowrap text-center">
        {trustAcc.directorsOfTrustCo}
      </td>
      <td className="border py-2 px-4 text-nowrap text-center">
        {trustAcc.trusteeNames}
      </td>
      <td className="border py-2 px-4 text-center">{trustAcc.trustGender}</td>
      <td className="border py-2 px-4 text-center text-nowrap">
        {trustAcc.dateOfBirth}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.nationalityOfTrustee}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.residenceOfShareholder}
      </td>
      <td className="border py-2 px-4">{trustAcc.idNumber}</td>
      <td className="border py-2 px-4">{trustAcc.kraPin}</td>
      <td className="border py-2 px-4">{trustAcc.contact}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.academicQualifications}
      </td>
      <td className="border py-2 px-4">{trustAcc.otherTrusteeships}</td>
      <td className="border py-2 px-4">{trustAcc.disclosureDetails}</td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.shareholderOfTrust}
      </td>
      <td className="border py-2 px-4 text-center">
        {trustAcc.percentageOfShareholding}%
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
        <EditPSPScheduleOfTrusteesModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-trustees/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfTrusteesRow;
