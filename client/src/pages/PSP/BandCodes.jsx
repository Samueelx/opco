import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import apiRequest from "../../lib/apiRequest";
import { AddTariffModal, UploadTariffsModal } from "../../components";
import { Link } from "react-router-dom";

function BandCodes() {
  const [bandCode, setBandCode] = useState([]);

  let [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchTariffsData();
  }, []);

  const fetchTariffsData = async () => {
    try {
      const tariffsData = await apiRequest.get("/band-codes");
      setBandCode(tariffsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden flex-center flex-col space-y-8">
      <div className="flex justify-end w-full px-6">
        {/* <button
          onClick={() => openModal("add")}
          type="button"
          className="border px-5 py-1 w-fit ml-8 rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
        >
          Add
        </button> */}

        <button
          onClick={() => openModal("csv")}
          type="button"
          className="border px-5 py-1 w-fit ml-8 rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
        >
          Bulk Add
        </button>
      </div>

      <h1 className="text-2xl font-semibold">Select a date</h1>

      <div className="flex items-center flex-wrap gap-8 justify-center">
        {Array.isArray(bandCode) && bandCode.length > 0 ? bandCode.map((bandCode) => {
          return <DateBtn key={bandCode.id} bandCode={bandCode} />;
        }): <div>No Tariffs found!</div>}
        
      </div>

      <AddTariffModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchTariffsData}
      />
      <UploadTariffsModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchTariffsData}
      />
    </div>
  );
}

const DateBtn = ({ bandCode }) => {
  return (
    <Link
      to={`/band-codes/${bandCode.id}`}
      className="border p-4 w-64 flex-center rounded-xl hover:shadow-md text-center"
    >
      {bandCode.reportingDate}
    </Link>
  );
};

DateBtn.propTypes = {
  bandCode: PropTypes.object.isRequired,
};

export default BandCodes;
