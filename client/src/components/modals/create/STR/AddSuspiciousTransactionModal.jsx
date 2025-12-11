/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";

export default function AddSuspiciousTransactionModal({
  isOpen,
  setIsOpen,
  onRecordAdded,
}) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErr("");
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await apiRequest.post("/suspicious-transactions", data);
      console.log("Suspicious Transaction Added: ", response.data);

      onRecordAdded();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log("Error:", error);
      setErr(error.response.data.message);
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
                    Add a Suspicious Transaction Record
                  </Dialog.Title>
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="pspId"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PSP ID
                        </label>
                        <select
                          name="pspId"
                          id="pspId"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {pspName.map(({ code, name }) => (
                            <option key={code} value={code}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="reportingDate"
                          className="text-nowrap font-semibold text-sm"
                        >
                          REPORTING DATE
                        </label>
                        <input
                          type="date"
                          name="reportingDate"
                          id="reportingDate"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="transactionFlag"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TRANSACTION FLAG
                        </label>
                        <select
                          name="transactionFlag"
                          id="transactionFlag"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select...</option>
                          <option value="Suspicious">Suspicious</option>
                          <option value="Cash">Cash</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfMLRelatedSTRsReported"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NO. OF ML-RELATED STRs
                        </label>
                        <input
                          type="number"
                          name="numberOfMLRelatedSTRsReported"
                          id="numberOfMLRelatedSTRsReported"
                          placeholder="0"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfTFRelatedSTRsReported"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NO. OF TF-RELATED STRs
                        </label>
                        <input
                          type="number"
                          name="numberOfTFRelatedSTRsReported"
                          id="numberOfTFRelatedSTRsReported"
                          placeholder="0"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfPFRelatedSTRsReported"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NO. OF PF-RELATED STRs
                        </label>
                        <input
                          type="number"
                          name="numberOfPFRelatedSTRsReported"
                          id="numberOfPFRelatedSTRsReported"
                          placeholder="0"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfTransactionsAbove15000"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NO. OF TRANSACTIONS &gt; USD 15,000
                        </label>
                        <input
                          type="number"
                          name="numberOfTransactionsAbove15000"
                          id="numberOfTransactionsAbove15000"
                          placeholder="0"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="totalValueOfTransactionsAbove15000"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TOTAL VALUE &gt; USD 15,000 (KSH&apos;000)
                        </label>
                        <input
                          type="number"
                          name="totalValueOfTransactionsAbove15000"
                          id="totalValueOfTransactionsAbove15000"
                          placeholder="0"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                  {err && <p className="text-red-400 italic">{err}</p>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}