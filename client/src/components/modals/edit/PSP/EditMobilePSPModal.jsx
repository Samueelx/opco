/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { denominationCodes, pspName, subCountyArr } from "../../../../lib/subCountyData";

export default function EditMobilePSPModal({
  isOpen,
  setIsOpen,
  trustAcc,
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
      const response = await apiRequest.put(
        `/mobile-psp-counterfeit-currency-frauds/${trustAcc.rowId}`,
        data
      );
      console.log("Counterfeit Currency Frauds: ", response.data);

      onRecordAdded();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error)
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
                    Edit Counterfeit Currency Fraud
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
                          {pspName.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
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
                          htmlFor="subCountyCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SUB COUNTY CODE
                        </label>
                        <select
                          name="subCountyCode"
                          id="subCountyCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {subCountyArr.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
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
                          defaultValue={trustAcc.agentId}
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
                        <select
                          name="denominationCode"
                          id="denominationCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {denominationCodes.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
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
                          defaultValue={trustAcc.serialNumber}
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
                          defaultValue={trustAcc.depositorsName}
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
                          defaultValue={trustAcc.tellersName}
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
                          min={0}
                          defaultValue={trustAcc.numberOfPieces}
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
                          defaultValue={trustAcc.remarks}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {loading ? "Updating..." : "Update"}
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
