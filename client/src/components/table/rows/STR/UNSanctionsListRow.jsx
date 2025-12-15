/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditUNSanctionsListModal from "../../../modals/edit/STR/EditUNSanctionsListModal";

const UNSanctionsListRow = ({ record, onRecordAdded }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return (
    <tr className="even:bg-[#f2f2f2] hover:bg-[#ddd]">
      <td className="border py-2 px-4">{record.pspId}</td>
      <td className="border py-2 px-4">{record.reportingDate}</td>
      <td className="border py-2 px-4">{record.typeOfTransaction}</td>
      <td className="border py-2 px-4">{record.typeOfAccountInvolved}</td>
      <td className="border py-2 px-4">{record.nameOfPersonListedInUNSCList}</td>
      <td className="border py-2 px-4">{record.accountName}</td>
      <td className="border py-2 px-4">{record.accountNumber}</td>
      <td className="border py-2 px-4">{record.nameOfFinancialInstitution}</td>
      <td className="border py-2 px-4">{record.financialInstitutionsInvolved}</td>
      <td className="border py-2 px-4">{record.countriesInvolvedInTransaction}</td>
      <td className="border py-2 px-4 text-center">{record.amount}</td>
      <td className="border py-2 text-center">
        <button
          type="button"
          className="bg-gray-400 border-none px-2.5 rounded text-white"
          onClick={openModal}
        >
          Edit
        </button>
      </td>
      <td className="border py-2 text-center">
        <button
          type="button"
          className="bg-red-400 border-none px-2.5 rounded text-white"
          onClick={openDeleteModal}
        >
          Delete
        </button>
        <EditUNSanctionsListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          record={record}
          onRecordAdded={onRecordAdded}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/un-sanctions-list/${record.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default UNSanctionsListRow;