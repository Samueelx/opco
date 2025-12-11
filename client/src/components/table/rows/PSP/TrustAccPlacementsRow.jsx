import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditTrustAccPlacementsModal from "../../../modals/edit/PSP/EditTrustAccPlacementsModal";
import { formatKESCurrency } from "../../../../lib/formatDatetime";

/* eslint-disable react/prop-types */
const TrustAccPlacementsRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.trustFundPlacement}</td>
      <td className="border py-2 px-4">{trustAcc.trustFundInvMaturityDate}</td>
      <td className="border py-2 px-4">{formatKESCurrency(trustAcc.catTrustFundInvestedAmt)}</td>
      <td className="border py-2 px-4">{trustAcc.interestAmtPerCat}</td>

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
        <EditTrustAccPlacementsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/trust-account-placements/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default TrustAccPlacementsRow;
