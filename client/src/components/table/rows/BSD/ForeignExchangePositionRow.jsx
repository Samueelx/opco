import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditForeignExchangePositionModal from "../../../modals/edit/BSD/EditForeignExchangePositionModal";

/* eslint-disable react/prop-types */
const ForeignExchangePositionRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.currencyCode}</td>
      <td className="border py-2 px-4">{trustAcc.kesSpotRate}</td>
      <td className="border py-2 px-4">{trustAcc.openingPositionAmount}</td>
      <td className="border py-2 px-4">{trustAcc.totalInflowsAmount}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.otherTotalInflowsAmount}
      </td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.totalOutflowsAmount}
      </td>
      <td className="border py-2 px-4">{trustAcc.otherTotalOutflowsAmount}</td>

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
        <EditForeignExchangePositionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/exchange-rate-position/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default ForeignExchangePositionRow;
