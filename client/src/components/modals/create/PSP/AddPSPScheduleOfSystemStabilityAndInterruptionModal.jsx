/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { pspName, subCountyArr } from "../../../../lib/subCountyData";
import { productType, recoveryTimeCode, severityInterruptionCode, systemInterruptionCauseCode, systemUnavailabilityTypeCode, thirdPartyOwnedCategoryData } from "../../../../lib/bankCodesData";

export default function AddPSPScheduleOfSystemStabilityAndInterruptionModal({
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
      const response = await apiRequest.post(
        "/psp-schedule-of-system-stability-and-service-interruption",
        data
      );
      console.log("System Interruption: ", response.data);

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
                    Add a Schedule Of System Stability & System Interruption
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
                          htmlFor="systemOwnerFlag"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SYSTEM OWNER FLAG
                        </label>
                        <select
                          name="systemOwnerFlag"
                          id="systemOwnerFlag"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="Y">PSP Owned</option>
                          <option value="N">Third party Owned</option>
                          <option value="YN">No system affected</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="thirdPartyOwnedCategory"
                          className="text-nowrap font-semibold text-sm"
                        >
                          THIRD PARTY OWNED CATEGORY
                        </label>
                        <select
                          name="thirdPartyOwnedCategory"
                          id="thirdPartyOwnedCategory"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {thirdPartyOwnedCategoryData.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="thirdPartyName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          THIRD PARTY NAME
                        </label>
                        <input
                          type="text"
                          name="thirdPartyName"
                          id="thirdPartyName"
                          placeholder="Kenswitch"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="productType"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PRODUCT TYPE
                        </label>
                        <select
                          name="productType"
                          id="productType"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {productType.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="systemUnavailabilityTypeCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SYSTEM UNAVAILABILITY TYPE CODE
                        </label>
                        <select
                          name="systemUnavailabilityTypeCode"
                          id="systemUnavailabilityTypeCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {systemUnavailabilityTypeCode.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="thirdPartySystemAffected"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NAME OF 3RD PARTY SYSTEM AFFECTED
                        </label>
                        <input
                          type="text"
                          name="thirdPartySystemAffected"
                          id="thirdPartySystemAffected"
                          placeholder="KPLC"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="systemInterruptionCauseCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SYSTEM INTERRUPTION CAUSE CODE
                        </label>
                        <select
                          name="systemInterruptionCauseCode"
                          id="systemInterruptionCauseCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {systemInterruptionCauseCode.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="severityInterruptionCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SEVERITY OF INTERRUPTION CODE
                        </label>
                        <select
                          name="severityInterruptionCode"
                          id="severityInterruptionCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {severityInterruptionCode.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="recoveryTimeCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          RECOVERY TIME CODE
                        </label>
                        <select
                          name="recoveryTimeCode"
                          id="recoveryTimeCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {recoveryTimeCode.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="remedialStatusCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          REMEDIAL STATUS CODE
                        </label>
                        <select
                          name="remedialStatusCode"
                          id="remedialStatusCode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="REMCST01">Open</option>
                          <option value="REMCST02">Closed</option>
                          <option value="REMCST03">Not applicable because system was available</option>
                          <option value="REMCST99">Other Status Code</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="systemUptime"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SYSTEM UPTIME PERCENTAGE
                        </label>
                        <input
                          type="text"
                          name="systemUptime"
                          id="systemUptime"
                          placeholder="99.99"
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
