/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditSuspiciousTransactionModal from "../../../modals/edit/STR/EditSuspiciousTransactionModal";

const SuspiciousTransactionsRow = ({ transaction, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{transaction.pspId}</td>
      <td className="border py-2 px-4">{transaction.reportingDate}</td>
      <td className="border py-2 px-4">{transaction.transactionFlag}</td>
      <td className="border py-2 px-4 text-center">
        {transaction.numberOfMLRelatedSTRsReported}
      </td>
      <td className="border py-2 px-4 text-center">
        {transaction.numberOfTFRelatedSTRsReported}
      </td>
      <td className="border py-2 px-4 text-center">
        {transaction.numberOfPFRelatedSTRsReported}
      </td>
      <td className="border py-2 px-4 text-center">
        {transaction.numberOfTransactionsAbove15000}
      </td>
      <td className="border py-2 px-4 text-center">
        {transaction.totalValueOfTransactionsAbove15000}
      </td>
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
        <EditSuspiciousTransactionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          transaction={transaction}
          onRecordAdded={onRecordAdded}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/suspicious-transactions/${transaction.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default SuspiciousTransactionsRow;