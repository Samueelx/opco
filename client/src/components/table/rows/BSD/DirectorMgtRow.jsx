import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditDirectorMgtModal from "../../../modals/edit/BSD/EditDirectorMgtModal";

/* eslint-disable react/prop-types */
const DirectorMgtRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.institutionCode}</td>
      <td className="border py-2 px-4">{trustAcc.reportingDate}</td>
      <td className="border py-2 px-4">{trustAcc.sequenceId}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.nameOfDirector}
      </td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.staffId}</td>
      <td className="border py-2 px-4">{trustAcc.memberType}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.executiveCatType}
      </td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.gender}</td>
      <td className="border py-2 px-4">{trustAcc.nationality}</td>
      <td className="border py-2 px-4">{trustAcc.residency}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.identificationNumber}
      </td>
      <td className="border py-2 px-4">{trustAcc.passportNumber}</td>
      <td className="border py-2 px-4">{trustAcc.academicQualification}</td>
      <td className="border py-2 px-4">{trustAcc.profession}</td>
      <td className="border py-2 px-4">{trustAcc.contactNumber}</td>
      <td className="border py-2 px-4">{trustAcc.email}</td>
      <td className="border py-2 px-4">{trustAcc.appointmentDate}</td>
      <td className="border py-2 px-4">{trustAcc.cbkApprovalDate}</td>
      <td className="border py-2 px-4">{trustAcc.boardChairCommittee}</td>
      <td className="border py-2 px-4">{trustAcc.boardCommitteeName}</td>
      <td className="border py-2 px-4">{trustAcc.managementCommitteeName}</td>
      <td className="border py-2 px-4">{trustAcc.companyName}</td>
      <td className="border py-2 px-4">{trustAcc.roleInCompany}</td>
      <td className="border py-2 px-4">{trustAcc.shareholdingFlag}</td>
      <td className="border py-2 px-4">{trustAcc.shareholdingInfo}</td>
      <td className="border py-2 px-4">{trustAcc.bankingExperience}</td>

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
        <EditDirectorMgtModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/director-management-info/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default DirectorMgtRow;
