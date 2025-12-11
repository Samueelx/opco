import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditFinPositionModal from "../../../modals/edit/BSD/EditFinPositionModal";

/* eslint-disable react/prop-types */
const FinPositionRow = ({ trustAcc, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{trustAcc.fxbCode}</td>
      <td className="border py-2 px-4">{trustAcc.reportingDate}</td>
      <td className="border py-2 px-4">{trustAcc.mappingCode}</td>
      <td className="border py-2 px-4">{trustAcc.amount}</td>
      <td className="border py-2 px-4">{trustAcc.numberOfEmployees}</td>
      <td className="border py-2 px-4">{trustAcc.numberOfOutlets}</td>

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
        <EditFinPositionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trustAcc={trustAcc}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/financial-position/${trustAcc.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default FinPositionRow;
