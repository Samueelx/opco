import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditExchangeRatesInfoModal from "../../../modals/edit/BSD/EditExchangeRatesInfoModal";

/* eslint-disable react/prop-types */
const ExchangeRatesRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.buyingRate}</td>
      <td className="border py-2 px-4">{trustAcc.sellingRate}</td>
      <td className="border py-2 px-4">{trustAcc.meanRate}</td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.closingBidRate}
      </td>
      <td className="border py-2 px-4 text-nowrap">
        {trustAcc.closingOfferRate}
      </td>
      <td className="border py-2 px-4">{trustAcc.usdCrossRate}</td>

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
        <EditExchangeRatesInfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/exchange-rate-info/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default ExchangeRatesRow;
