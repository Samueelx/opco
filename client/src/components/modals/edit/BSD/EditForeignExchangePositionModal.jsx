/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";

export default function EditForeignExchangePositionModal({
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
        `/exchange-rate-position/${trustAcc.rowId}`,
        data
      );
      console.log("Foreign Exchange Rate Position: ", response.data);

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
                    Edit Foreign Exchange Rate Position
                  </Dialog.Title>
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="institutionCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INSTITUTION CODE
                        </label>
                        <input
                          type="text"
                          name="institutionCode"
                          id="institutionCode"
                          defaultValue={trustAcc.institutionCode}
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
                          htmlFor="currencyCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CURRENCY CODE
                        </label>
                        <input
                          type="text"
                          name="currencyCode"
                          id="currencyCode"
                          required
                          defaultValue={trustAcc.currencyCode}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="kesSpotRate"
                          className="text-nowrap font-semibold text-sm"
                        >
                          KES SPOT RATE
                        </label>
                        <input
                          type="text"
                          name="kesSpotRate"
                          id="kesSpotRate"
                          defaultValue={trustAcc.kesSpotRate}
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="openingPositionAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OPENING POSITION AMOUNT
                        </label>
                        <input
                          type="text"
                          name="openingPositionAmount"
                          id="openingPositionAmount"
                          required
                          defaultValue={trustAcc.openingPositionAmount}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="totalInflowsAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TOTAL INFLOWS AMOUNT
                        </label>
                        <input
                          type="text"
                          name="totalInflowsAmount"
                          id="totalInflowsAmount"
                          required
                          defaultValue={trustAcc.totalInflowsAmount}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="otherTotalInflowsAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OTHER TOTAL INFLOWS AMOUNT
                        </label>
                        <input
                          type="text"
                          name="otherTotalInflowsAmount"
                          id="otherTotalInflowsAmount"
                          defaultValue={trustAcc.otherTotalInflowsAmount}
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="totalOutflowsAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TOTAL OUTFLOWS AMOUNT
                        </label>
                        <input
                          type="text"
                          name="totalOutflowsAmount"
                          id="totalOutflowsAmount"
                          className="outline-none border p-1.5 rounded"
                          defaultValue={trustAcc.totalOutflowsAmount}
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="otherTotalOutflowsAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OTHER TOTAL OUTFLOWS AMOUNT
                        </label>
                        <input
                          type="text"
                          name="otherTotalOutflowsAmount"
                          id="otherTotalOutflowsAmount"
                          className="outline-none border p-1.5 rounded"
                          defaultValue={trustAcc.otherTotalOutflowsAmount}
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
