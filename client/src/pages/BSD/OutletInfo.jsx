import { useEffect, useState } from "react";
import {
  AddOutletInfoModal,
  OutletInfoHeader,
  OutletInfoRow,
  UploadOutletInfoModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const OutletInfo = () => {
  const [outletInfo, setOutletInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchOutletInfoData();
  }, []);

  const fetchOutletInfoData = async () => {
    try {
      const outletInfoData = await apiRequest.get("/outlet-information");
      setOutletInfo(outletInfoData.data);
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">Branch/Outlet Information</h2>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mb-10">
            <OutletInfoHeader />

            <tbody>
              {outletInfo &&
                outletInfo.map((trustAcc) => (
                  <OutletInfoRow
                    key={trustAcc.rowId}
                    trustAcc={trustAcc}
                    onRecordAdded={fetchOutletInfoData}
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

      <AddOutletInfoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchOutletInfoData}
      />

      <UploadOutletInfoModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchOutletInfoData}
      />
    </div>
  );
};

export default OutletInfo;
