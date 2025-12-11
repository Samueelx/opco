import { useEffect, useState } from "react";

import {
  AddPSPCybersecurityModal,
  PSPCybersecurityHeader,
  PSPCybersecurityRow,
  UploadCybersecurityModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const PSPCybersecurity = () => {
  const [cybersecurityIncidents, setCybersecurityIncidents] = useState([]);
  const [reportingDate, setReportingDate] = useState("")
  let [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    if (reportingDate) { 
      fetchTrustAccountsData();
    }
  }, [reportingDate]);

  const fetchTrustAccountsData = async () => {
    try {
      const trustAccountsData = await apiRequest.get(
        `/psp-cybersecurity-incident-record/${reportingDate}`
      );
      setCybersecurityIncidents(trustAccountsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">
          PSP Cybersecurity Incident Record{" "}
        </h2>

        <div className="p-4 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex gap-2">
            <h5 className="font-semibold">Select a Reporting Date: </h5>
            <input type="date" name="reportingDate" id="reportingDate" className="border border-red-500 rounded" value={reportingDate} onChange={e=>{
              setReportingDate(e.target.value)
              }}/>
          </div>
        </div>

        <div className="overflow-x-auto">
          {cybersecurityIncidents && Array.isArray(cybersecurityIncidents) && cybersecurityIncidents.length > 0 ? 
            (
            <table className="border-collapse w-full mb-10">
              <PSPCybersecurityHeader />

              <tbody>
                {cybersecurityIncidents &&
                  cybersecurityIncidents.map((trustAcc) => (
                    <PSPCybersecurityRow
                    key={trustAcc.rowId}
                    trustAcc={trustAcc}
                    onRecordAdded={fetchTrustAccountsData}
                    />
                    ))}
              </tbody>
            </table>
            ) : (
              <div className="flex-center p-4">
              <p className="text-lg font-semibold italic text-red-500">No data found for: <span className="text-red-600 font-extrabold ml-2">{reportingDate}</span></p>
          </div>
          )}   
        </div>

        <div className="flex-center gap-20">
          <button
            onClick={() => openModal("add")}
            type="button"
            className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Add
          </button>

          <button
            onClick={() => openModal("csv")}
            type="button"
            className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Bulk Add
          </button>
        </div>
      </div>

      <AddPSPCybersecurityModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchTrustAccountsData}
      />

      <UploadCybersecurityModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchTrustAccountsData}
      />
    </div>
  );
};

export default PSPCybersecurity;
