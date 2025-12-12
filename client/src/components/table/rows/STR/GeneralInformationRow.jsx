/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditGeneralInformationModal from "../../../modals/edit/STR/EditGeneralInformationModal";

const GeneralInformationRow = ({ info, onRecordAdded }) => {
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
      <td className="border py-2 px-4">{info.pspId}</td>
      <td className="border py-2 px-4">{info.reportingDate}</td>
      <td className="border py-2 px-4 text-center">
        {info.totalNumberOfStaffForTheOrganization}
      </td>
      <td className="border py-2 px-4 text-center">
        {info.totalNumberSupportingComplainceAMLTFPF}
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
        <EditGeneralInformationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          info={info}
          onRecordAdded={onRecordAdded}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/general-information/${info.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default GeneralInformationRow;