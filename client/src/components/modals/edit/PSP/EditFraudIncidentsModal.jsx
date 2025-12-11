/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { pspName, subCountyArr } from "../../../../lib/subCountyData";
import { fraudCategoryTypeCode, fraudCode, victimAttributeCode, victimCategoryCode } from "../../../../lib/bankCodesData";

export default function EditFraudIncidentsModal({
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
        `/psp-incidents-of-fraud-theft-robbery/${trustAcc.rowId}`,
        data
      );
      console.log("Fraud Incident: ", response.data);

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
                    Edit Fraud Incident
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
                            {pspName.map(({code,name})=>(
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
                          className="outline-none border p-1.5 rounded"
                          required
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
                          htmlFor="subFraudCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SUB FRAUD CODE
                        </label>
                        <select
                            name="subFraudCode"
                            id="subFraudCode"
                            required
                            className="outline-none border p-1.5 rounded"
                          >
                            {fraudCode.map(({code,name})=>(
                              <option key={code} value={code}>{name}</option>
                            ))}
                          </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="fraudCategoryFlag"
                          className="text-nowrap font-semibold text-sm"
                        >
                          FRAUD CATEGORY FLAG
                        </label>
                        <select
                            name="fraudCategoryFlag"
                            id="fraudCategoryFlag"
                            required
                            className="outline-none border p-1.5 rounded"
                          >
                            {fraudCategoryTypeCode.map(({code,name})=>(
                              <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="victimCategory"
                          className="text-nowrap font-semibold text-sm"
                        >
                          VICTIM CATEGORY
                        </label>
                        <select
                            name="victimCategory"
                            id="victimCategory"
                            required
                            className="outline-none border p-1.5 rounded"
                          >
                            {victimCategoryCode.map(({code,name})=>(
                              <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="victimInfo"
                          className="text-nowrap font-semibold text-sm"
                        >
                          VICTIM INFO
                        </label>
                        {/* <select
                            name="victimInfo"
                            id="victimInfo"
                            required
                            className="outline-none border p-1.5 rounded"
                          >
                            {victimAttributeCode.map(({code,name})=>(
                              <option key={code} value={code}>{name}</option>
                            ))}
                        </select> */}
                        <textarea
                          type="text"
                          name="victimInfo"
                          id="victimInfo"
                          defaultValue={victimAttributeCode.victimInfo}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateOfOccurence"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OCCURRENCE DATE
                        </label>
                        <input
                          type="date"
                          name="dateOfOccurence"
                          id="dateOfOccurence"
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfIncidents"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NUMBER OF INCIDENTS
                        </label>
                        <input
                          type="number"
                          name="numberOfIncidents"
                          id="numberOfIncidents"
                          defaultValue={trustAcc.numberOfIncidents}
                          min={0}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="amountInvolved"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AMOUNT INVOLVED
                        </label>
                        <input
                          type="number"
                          name="amountInvolved"
                          id="amountInvolved"
                          placeholder="1,000,482"
                          min={0}
                          defaultValue={trustAcc.amountInvolved}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="amountLost"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AMOUNT LOST
                        </label>
                        <input
                          type="number"
                          name="amountLost"
                          id="amountLost"
                          placeholder="1,000,482"
                          min={0}
                          defaultValue={trustAcc.amountLost}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="amountRecovered"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AMOUNT RECOVERED
                        </label>
                        <input
                          type="number"
                          name="amountRecovered"
                          id="amountRecovered"
                          placeholder="0"
                          min={0}
                          defaultValue={trustAcc.amountRecovered}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="actionTaken"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACTION TAKEN
                        </label>
                        <textarea
                          type="text"
                          name="actionTaken"
                          id="actionTaken"
                          defaultValue={trustAcc.actionTaken}
                          className="outline-none border p-1.5 rounded"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="recoveryDetails"
                          className="text-nowrap font-semibold text-sm"
                        >
                          RECOVERY DETAILS
                        </label>

                        <select
                          name="recoveryDetails"
                          id="recoveryDetails"
                          className="outline-none border p-1.5 rounded"
                          defaultValue={trustAcc.recoveryDetails}
                          required
                        >
                          <option value="Complete">Complete</option>
                          <option value="Incomplete">Incomplete</option>
                        </select>
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
