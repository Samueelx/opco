import { useEffect, useState } from "react";
import {
  AddExchangeRatesModal,
  ExchangeRatesHeader,
  ExchangeRatesRow,
  UploadExchangeRatesModal,
} from "../../components";
import apiRequest from "../../lib/apiRequest";

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchExchangeRatesData();
  }, []);

  const fetchExchangeRatesData = async () => {
    try {
      const exchangeRatesData = await apiRequest.get("/exchange-rate-info");
      setExchangeRates(exchangeRatesData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">Exchange Rates Information</h2>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mb-10">
            <ExchangeRatesHeader />

            <tbody>
              {exchangeRates &&
                exchangeRates.map((trustAcc) => (
                  <ExchangeRatesRow
                    key={trustAcc.rowId}
                    trustAcc={trustAcc}
                    onRecordAdded={fetchExchangeRatesData}
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

      <AddExchangeRatesModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchExchangeRatesData}
      />

      <UploadExchangeRatesModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchExchangeRatesData}
      />
    </div>
  );
};

export default ExchangeRates;
