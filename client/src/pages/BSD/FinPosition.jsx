import { useEffect, useState } from "react";

import {
  AddFinPositionModal,
  FinPositionHeader,
  FinPositionRow,
  UploadFinPositionModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const FinPosition = () => {
  const [finPositions, setFinPositions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchFinPositionsData();
  }, []);

  const fetchFinPositionsData = async () => {
    try {
      const finPositionsData = await apiRequest.get("/financial-position");
      setFinPositions(finPositionsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">
          Statements Of Financial Position And Comprehensive Income
        </h2>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mb-10">
            <FinPositionHeader />

            <tbody>
              {finPositions &&
                finPositions.map((trustAcc) => (
                  <FinPositionRow
                    key={trustAcc.rowId}
                    trustAcc={trustAcc}
                    onRecordAdded={fetchFinPositionsData}
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

      <AddFinPositionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchFinPositionsData}
      />

      <UploadFinPositionModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchFinPositionsData}
      />
    </div>
  );
};

export default FinPosition;
