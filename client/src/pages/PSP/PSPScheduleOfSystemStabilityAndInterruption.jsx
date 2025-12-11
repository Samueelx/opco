import { useEffect, useState } from "react";

import {
  AddPSPScheduleOfSystemStabilityAndInterruptionModal,
  PSPScheduleOfSystemStabilityInterruptionHeader,
  PSPScheduleOfSystemStabilityInterruptionRow,
  UploadPSPScheduleOfSystemStabilityAndInterruptionModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

function PSPScheduleOfSystemStabilityAndInterruption() {
  const [systemStability, setSystemStability] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchSystemStabilityData();
  }, []);

  const fetchSystemStabilityData = async () => {
    try {
      const systemStabilityData = await apiRequest.get(
        "/psp-schedule-of-system-stability-and-service-interruption"
      );
      setSystemStability(systemStabilityData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">
          PSP Schedule Of System Stability & System Interruption
        </h2>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mb-10">
            <PSPScheduleOfSystemStabilityInterruptionHeader />

            <tbody>
              {systemStability &&
                systemStability.map((sysStability) => (
                  <PSPScheduleOfSystemStabilityInterruptionRow
                    key={sysStability.rowId}
                    sysStability={sysStability}
                    onRecordAdded={fetchSystemStabilityData}
                  />
                ))}
            </tbody>
          </table>
        </div>

        <div className="">
          <button
            onClick={() => openModal("add")}
            type="button"
            className="border px-5 py-1 w-fit ml-8 rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Add
          </button>

          <button
            onClick={() => openModal("csv")}
            type="button"
            className="border px-5 py-1 w-fit ml-8 rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Bulk Add
          </button>
        </div>
      </div>

      <AddPSPScheduleOfSystemStabilityAndInterruptionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchSystemStabilityData}
      />

      <UploadPSPScheduleOfSystemStabilityAndInterruptionModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchSystemStabilityData}
      />
    </div>
  );
}

export default PSPScheduleOfSystemStabilityAndInterruption;
