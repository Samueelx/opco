/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";

export default function UploadCustomerComplaintsModal({
  isOpen,
  setIsOpen,
  onRecordAdded,
}) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.name.endsWith('.csv')) {
      setErr("Please select a CSV file");
      setFile(null);
      return;
    }
    setErr("");
    setFile(selectedFile);
  };

  function closeModal() {
    setIsOpen(false);
    setErr("")
    setFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!file) {
      alert("Please select a file first!");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiRequest.post(
        "/psp-schedule-of-customer-complaints-&-remedial-actions/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
       
      if (response.status === 200 || response.status === 201) {
        onRecordAdded();
        closeModal()
        console.log("CSV file uploaded successfully!", response.data);
      }else{
        throw new Error("Failed to upload file")
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setErr(error.message || "An unexpected error occured")
    }finally{
      setLoading(false)
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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-6">

                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-bold text-gray-900"
                      >
                    PSP Schedule of Customer Complaints & Remedial Actions{" "}
                    </Dialog.Title>
                    <div className="flex flex-col">
                      <a 
                        href="/csv/customerComplaint.csv" 
                        download="customerComplaint.csv" 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                        Report template (CSV)
                      </a>
                      <small className="text-red-600 italic text-[10px]">All columns are mandatory*</small>
                    </div>
                  </div>

                  {err && (
                  <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md border border-red-200">
                    {err}
                  </div>
                )}

                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading || !file}
                    >
                      {loading ? (
                        <span className="flex items-center space-x-2">
                          <span className="animate-spin">⏳</span>
                          <span>Processing...</span>
                        </span>
                      ) : (
                        "Upload CSV"
                      )}
                    </button>
                  </div>
                  </form>
                </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
