import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditShareholderInfoModal from "../../../modals/edit/BSD/EditShareholderInfoModal";

/* eslint-disable react/prop-types */
const ShareholdersInfoRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.bankCode}</td>
      <td className="border py-2 px-4">{trustAcc.reportingDate}</td>
      <td className="border py-2 px-4">{trustAcc.shareholderSequence}</td>
      <td className="border py-2 px-4">{trustAcc.name}</td>
      <td className="border py-2 px-4">{trustAcc.gender}</td>
      <td className="border py-2 px-4">{trustAcc.type}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.registrationDate}
      </td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.nationality}</td>
      <td className="border py-2 px-4">{trustAcc.residence}</td>
      <td className="border py-2 px-4">{trustAcc.idNumber}</td>
      <td className="border py-2 px-4">{trustAcc.address}</td>
      <td className="border py-2 px-4">{trustAcc.phoneNumber}</td>
      <td className="border py-2 px-4">{trustAcc.majorPromoter}</td>
      <td className="border py-2 px-4">{trustAcc.subscribedShares}</td>
      <td className="border py-2 px-4">{trustAcc.shareValue}</td>
      <td className="border py-2 px-4">{trustAcc.shareholdingAmount}</td>
      <td className="border py-2 px-4">{trustAcc.paidUpShares}</td>
      <td className="border py-2 px-4">{trustAcc.percentageOfShare}</td>

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
        <EditShareholderInfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/shareholder-info/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default ShareholdersInfoRow;
