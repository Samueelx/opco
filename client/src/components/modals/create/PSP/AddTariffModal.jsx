/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";

function AddTariffModal({ isOpen, setIsOpen, onRecordAdded }) {
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
      const response = await apiRequest.post(
        "/mobile-psp-counterfeit-currency-frauds",
        data
      );
      console.log("Counterfeit Currency Fraud: ", response.data);

      onRecordAdded();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
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
                    Add Tariff{" "}
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
                        <input
                          type="text"
                          name="pspId"
                          id="pspId"
                          placeholder="0800002"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
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
                          htmlFor="subCountyCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SUB COUNTY CODE
                        </label>
                        <input
                          type="text"
                          name="subCountyCode"
                          id="subCountyCode"
                          required
                          placeholder="121"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="agentId"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AGENT ID
                        </label>
                        <input
                          type="text"
                          name="agentId"
                          id="agentId"
                          placeholder="90200"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="denominationCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DENOMINATION CODE
                        </label>
                        <input
                          type="text"
                          name="denominationCode"
                          id="denominationCode"
                          defaultValue="KES1000"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="serialNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SERIAL NO
                        </label>
                        <input
                          type="text"
                          name="serialNumber"
                          id="serialNumber"
                          placeholder="AB0029977"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="depositorsName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DEPOSITOR&apos;S NAME
                        </label>
                        <input
                          type="text"
                          name="depositorsName"
                          id="depositorsName"
                          placeholder="John Doe"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="tellersName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TELLER&apos;S NAME
                        </label>
                        <input
                          type="text"
                          name="tellersName"
                          id="tellersName"
                          required
                          placeholder="Jane Doe"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateConfiscated"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE CONFISCATED
                        </label>
                        <input
                          type="date"
                          name="dateConfiscated"
                          id="dateConfiscated"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateSubmittedToCBK"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE SUBMITTED
                        </label>
                        <input
                          type="date"
                          name="dateSubmittedToCBK"
                          id="dateSubmittedToCBK"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfPieces"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PIECES
                        </label>
                        <input
                          type="number"
                          name="numberOfPieces"
                          id="numberOfPieces"
                          className="outline-none border p-1.5 rounded"
                          min={1}
                          defaultValue={1}
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="remarks"
                          className="text-nowrap font-semibold text-sm"
                        >
                          REMARKS
                        </label>
                        <textarea
                          type="number"
                          name="remarks"
                          id="remarks"
                          min={0}
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

export default AddTariffModal;
