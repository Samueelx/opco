/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";

export default function UploadSuspiciousTransactionsModal({
  isOpen,
  setIsOpen,
  onRecordAdded,
}) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    if (!file) {
      alert("Please select a file first!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiRequest.post(
        "/suspicious-transactions/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("CSV file uploaded successfully!", response.data);
      setLoading(false);
      setIsOpen(false);
      onRecordAdded();
    } catch (error) {
      console.error("Error uploading file: ", error);
      setErr(error.response?.data?.message || "Error uploading file");
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold text-gray-900"
                  >
                    Upload Suspicious Transactions CSV
                  </Dialog.Title>
                  <form
                    className="mt-3"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="file"
                        className="block text-sm font-semibold mb-2"
                      >
                        Select CSV File
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        CSV file must include columns: PSP_ID, REPORTING_DATE, TRANSACTION_FLAG, 
                        NUMBER_OF_ML_RELATED_STRs_REPORTED, NUMBER_OF_TF_RELATED_STRs_REPORTED, 
                        NUMBER_OF_PF_RELATED_STRs_REPORTED, NO_OF_TRANSACTIONS_ABOVE_USD_15000, 
                        TOTAL_VALUE_OF_TRANSACTIONS_ABOVE_USD_15000_IN_KSH_000
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Uploading CSV..." : "Upload CSV"}
                      </button>
                    </div>
                  </form>
                  {err && <p className="text-red-400 italic mt-2">{err}</p>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}