import { useEffect, useState } from "react";
import {
  AddTrustAccDetailsModal,
  TrustAccDetailsHeader,
  TrustAccDetailsRow,
  UploadTrustAccDetailsModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const TrustAccountDetails = () => {
  const [trustAccounts, setTrustAccounts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [reportingDate, setReportingDate] = useState("")

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
      const trustAccountsData = await apiRequest.get(`/trust-accounts/${reportingDate}`);
      setTrustAccounts(trustAccountsData.data);
      
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">Trust Account Details</h2>

        <div className="p-4 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex gap-2">
            <h5 className="font-semibold">Select a Reporting Date: </h5>
            <input type="date" name="reportingDate" id="reportingDate" className="border border-red-500 rounded" value={reportingDate} onChange={e=>{
              setReportingDate(e.target.value)
              }}/>
          </div>
        </div>

        <div className="overflow-x-auto">
          {trustAccounts && trustAccounts.length > 0 && reportingDate !== "" ? (
            <table className="border-collapse w-full mb-10">
              <TrustAccDetailsHeader />

              <tbody>
                {trustAccounts &&
                  trustAccounts.map((trustAcc) => (
                    <TrustAccDetailsRow
                      key={trustAcc.rowId}
                      trustAcc={trustAcc}
                      onRecordAdded={fetchTrustAccountsData}
                    />
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4 flex-center">No data found for date: <span className="ml-2 font-bold text-red-500">{reportingDate}</span></p>
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

      <AddTrustAccDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchTrustAccountsData}
      />

      <UploadTrustAccDetailsModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchTrustAccountsData}
      />
    </div>
  );
};

export default TrustAccountDetails;
