/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { formatDateTimeISO } from "../../../../lib/formatDatetime";
import { pspName } from "../../../../lib/subCountyData";
import { incidentModeData } from "../../../../lib/bankCodesData";

export default function EditPSPCybersecurityModal({
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
    const formattedData = {...data, 
      datetimeOfIncident: data.datetimeOfIncident ? formatDateTimeISO(data.datetimeOfIncident) : "",
      datetimeOfIncidentResolution: data.datetimeOfIncidentResolution ? formatDateTimeISO(data.datetimeOfIncidentResolution) : "" 
      }

    try {
      const response = await apiRequest.put(
        `/psp-cybersecurity-incident-record/${trustAcc.rowId}`,
        formattedData
      );
      console.log("Cybersecurity Incidents: ", response.data);

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
                    Edit Cybersecurity Incident
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

                      {/* <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="incidentNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INCIDENT NUMBER
                        </label>
                        <input
                          type="text"
                          name="incidentNumber"
                          id="incidentNumber"
                          defaultValue={trustAcc.incidentNumber}
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div> */}

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="locationOfAttacker"
                          className="text-nowrap font-semibold text-sm"
                        >
                          LOCATION OF ATTACKER
                        </label>
                        <input
                          type="text"
                          name="locationOfAttacker"
                          id="locationOfAttacker"
                          defaultValue={trustAcc.locationOfAttacker}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="incidentMode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INCIDENT MODE
                        </label>
                        <select
                          name="incidentMode"
                          id="incidentMode"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {incidentModeData.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="datetimeOfIncident"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INCIDENT DATE
                        </label>
                        <input
                          type="datetime-local"
                          name="datetimeOfIncident"
                          id="datetimeOfIncident"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="lossType"
                          className="text-nowrap font-semibold text-sm"
                        >
                          LOSS TYPE
                        </label>
                        <select
                          name="lossType"
                          id="lossType"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="FIN">Financial</option>
                          <option value="DAT">Data</option>
                          <option value="NLSS">No Loss, no incident occurred</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="detailsOfIncident"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DETAILS OF THE INCIDENT
                        </label>
                        <textarea
                          type="text"
                          name="detailsOfIncident"
                          id="detailsOfIncident"
                          required
                          defaultValue={trustAcc.detailsOfIncident}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="actionTakenToManageIncident"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACTION TAKEN TO MANAGE
                        </label>
                        <textarea
                          type="text"
                          name="actionTakenToManageIncident"
                          id="actionTakenToManageIncident"
                          defaultValue={trustAcc.actionTakenToManageIncident}
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="datetimeOfIncidentResolution"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INCIDENT RESOLUTION DATE
                        </label>
                        <input
                          type="datetime-local"
                          name="datetimeOfIncidentResolution"
                          id="datetimeOfIncidentResolution"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="actionTakenToMitigateIncident"
                          className="text-nowrap font-semibold text-sm"
                        >
                          MITIGATION ACTION
                        </label>
                        <textarea
                          type="text"
                          name="actionTakenToMitigateIncident"
                          id="actionTakenToMitigateIncident"
                          defaultValue={trustAcc.actionTakenToMitigateIncident}
                          required
                          className="outline-none border p-1.5 rounded"
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
                          type="text"
                          name="amountInvolved"
                          id="amountInvolved"
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
                          type="text"
                          name="amountLost"
                          id="amountLost"
                          defaultValue={trustAcc.amountLost}
                          className="outline-none border p-1.5 rounded"
                          required
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
