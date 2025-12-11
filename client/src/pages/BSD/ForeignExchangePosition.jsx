import { useEffect, useState } from "react";

import {
  AddForeignExchangePositionModal,
  ForeignExchangePositionHeader,
  ForeignExchangePositionRow,
  UploadForeignExchangePosModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const ForeignExchangePosition = () => {
  const [shareholders, setShareholders] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchTrustAccountsData();
  }, []);

  const fetchTrustAccountsData = async () => {
    try {
      const trustAccountsData = await apiRequest.get("/exchange-rate-position");
      setShareholders(trustAccountsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">Foreign Exchange Position</h2>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mb-10">
            <ForeignExchangePositionHeader />

            <tbody>
              {shareholders &&
                shareholders.map((trustAcc) => (
                  <ForeignExchangePositionRow
                    key={trustAcc.rowId}
                    trustAcc={trustAcc}
                    onRecordAdded={fetchTrustAccountsData}
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

      <AddForeignExchangePositionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchTrustAccountsData}
      />

      <UploadForeignExchangePosModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchTrustAccountsData}
      />
    </div>
  );
};

export default ForeignExchangePosition;
