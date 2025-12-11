import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditOutletInfoModal from "../../../modals/edit/BSD/EditOutletInfoModal";

/* eslint-disable react/prop-types */
const OutletInfoRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.bankId}</td>
      <td className="border py-2 px-4">{trustAcc.outletId}</td>
      <td className="border py-2 px-4">{trustAcc.reportingDate}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.typeOfOutlet}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.outletName}</td>
      <td className="border py-2 px-4">{trustAcc.town}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.subCountyCode}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.latitude}</td>
      <td className="border py-2 px-4">{trustAcc.longitude}</td>
      <td className="border py-2 px-4">{trustAcc.cbkApprovalDate}</td>
      <td className="border py-2 px-4 text-nowrap">{trustAcc.outletStatus}</td>
      <td className="border py-2 px-4">{trustAcc.openingDate}</td>
      <td className="border py-2 px-4">{trustAcc.closureDate}</td>
      <td className="border py-2 px-4">{trustAcc.licenseFeePayable}</td>

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
        <EditOutletInfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/outlet-information/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default OutletInfoRow;
