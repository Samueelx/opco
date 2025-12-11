import { useState } from "react";
import DeleteModal from "../../../modals/delete/DeleteModal";
import EditPSPScheduleOfSystemStabilityInterruptionModal from "../../../modals/edit/PSP/EditPSPScheduleOfSystemStabilityInterruptionModal";

/* eslint-disable react/prop-types */
const PSPScheduleOfSystemStabilityInterruptionRow = ({
  sysStability,
  onRecordAdded,
}) => {
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
      <td className="border py-2 px-4">{sysStability.pspId}</td>
      <td className="border py-2 px-4">{sysStability.reportingDate}</td>
      <td className="border py-2 px-4 text-nowrap">
        {sysStability.subCountyCode}
      </td>
      <td className="border py-2 px-4 text-center">
        {sysStability.systemOwnerFlag}
      </td>
      <td className="border py-2 px-4 text-center">
        {sysStability.thirdPartyOwnedCategory}
      </td>
      <td className="border py-2 px-4 text-nowrap">
        {sysStability.thirdPartyName}
      </td>
      <td className="border py-2 px-4 text-center">
        {sysStability.productType}
      </td>
      <td className="border py-2 px-4 text-center">
        {sysStability.systemUnavailabilityTypeCode}
      </td>
      <td className="border py-2 px-4 text-center">
        {sysStability.thirdPartySystemAffected}
      </td>
      <td className="border py-2 px-4">
        {sysStability.systemInterruptionCauseCode}
      </td>
      <td className="border py-2 px-4">
        {sysStability.severityInterruptionCode}
      </td>
      <td className="border py-2 px-4">{sysStability.recoveryTimeCode}</td>
      <td className="border py-2 px-4">{sysStability.remedialStatusCode}</td>
      <td className="border py-2 px-4">{sysStability.systemUptime}</td>

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
        <EditPSPScheduleOfSystemStabilityInterruptionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sysStability={sysStability}
          onRecordAdded={onRecordAdded}
        />

        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          endPoint={`/psp-schedule-of-system-stability-and-service-interruption/${sysStability.rowId}`}
          onRecordAdded={onRecordAdded}
        />
      </td>
    </tr>
  );
};

export default PSPScheduleOfSystemStabilityInterruptionRow;
