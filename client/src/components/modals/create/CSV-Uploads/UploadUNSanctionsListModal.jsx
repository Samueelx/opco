/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";

export default function UploadUNSanctionsListModal({
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

  const closeModal = () => {
    setIsOpen(false);
    setErr("");
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!file) {
      setErr("Please select a CSV file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiRequest.post(
        "/un-sanctions-list/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("CSV uploaded successfully:", response.data);
      onRecordAdded();
      closeModal();
    } catch (error) {
      console.error("Error uploading file:", error);
      setErr(error.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  Upload UN Sanctions List CSV
                </Dialog.Title>

                <form
                  className="mt-4"
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
                      id="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      required
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Required columns: PSP_ID, REPORTING_DATE,
                      TYPE_OF_TRANSACTION, TYPE_OF_ACCOUNT, NAME_IN_UNSC_LIST,
                      ACCOUNT_NAME, ACCOUNT_NUMBER, FINANCIAL_INSTITUTION,
                      INSTITUTIONS_INVOLVED, COUNTRIES_INVOLVED, AMOUNT
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? "Uploading CSV..." : "Upload CSV"}
                    </button>
                  </div>
                </form>

                {err && (
                  <p className="mt-3 text-sm text-red-500 italic">{err}</p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
