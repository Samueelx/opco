/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { complaintType, educationLevel, pspName, subCountyArr } from "../../../../lib/subCountyData";

export default function AddScheduleOfCustomerComplaintsModal({
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
        "/psp-schedule-of-customer-complaints-&-remedial-actions",
        data
      );
      console.log("Customer Complaint: ", response.data);

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
                    Add a Schedule of Customer Compliant & Remedial Action
                  </Dialog.Title>
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="pspId"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PSP NAME
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
                          htmlFor="complaintID"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINT ID
                        </label>
                        <input
                          type="text"
                          name="complaintID"
                          id="complaintID"
                          placeholder="IDF012023"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="code"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINT TYPE
                        </label>
                        <select
                          name="code"
                          id="code"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          {complaintType.map(({code, name})=>(
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="gender"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINANT&apos;S GENDER
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                          <option value="C">Corporate</option>
                          <option value="O">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="frequency"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINTS FREQUENCY
                        </label>

                        <select
                          name="frequency"
                          id="frequency"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="CFQC01">First-timer</option>
                          <option value="CFQC02">Second-timer</option>
                          <option value="CFQC03">Third-timer</option>
                          <option value="CFQC04">Forth-timer</option>
                          <option value="CFQC05">Fifth-timer</option>
                          <option value="CFQC99">Any other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="name"
                          className="text-nowrap font-semibold text-sm"
                        >
                          {"COMPLAINANT'S"} NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="John Doe"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="age"
                          className="text-nowrap font-semibold text-sm"
                        >
                          {"COMPLAINANT'S"} AGE
                        </label>
                        <input
                          type="number"
                          name="age"
                          id="age"
                          placeholder="27"
                          min={16}
                          max={120}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="contact"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CONTACT NUMBER
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          placeholder="0712345678"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="subCounty"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINANT&apos;S SUBCOUNTY
                        </label>
                        <select
                          name="subCounty"
                          id="subCounty"
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select Sub-County</option>
                          {subCountyArr.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="education"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPLAINANT&apos;S EDUCATION LEVEL
                        </label>
                        <select
                          name="education"
                          id="education"
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select Education level</option>
                          {educationLevel.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="otherDetails"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OTHER COMPLAINANT&apos;S DETAILS
                        </label>
                        <input
                          type="text"
                          name="otherDetails"
                          id="otherDetails"
                          placeholder="Brown hair"
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
                          placeholder="5467912"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateOfOccurrence"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE OF OCCURRENCE
                        </label>
                        <input
                          type="date"
                          name="dateOfOccurrence"
                          id="dateOfOccurrence"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateReported"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE REPORTED TO THE INSTITUTION
                        </label>
                        <input
                          type="date"
                          name="dateReported"
                          id="dateReported"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateResolved"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE RESOLVED
                        </label>
                        <input
                          type="date"
                          name="dateResolved"
                          id="dateResolved"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="remedialStatus"
                          className="text-nowrap font-semibold text-sm"
                        >
                          REMEDIAL STATUS
                        </label>
                        <select
                          name="remedialStatus"
                          id="remedialStatus"
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
                          htmlFor="amountLost"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AMOUNT LOST
                        </label>
                        <input
                          type="number"
                          name="amountLost"
                          id="amountLost"
                          placeholder="5,000,000"
                          required
                          className="outline-none border p-1.5 rounded"
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
                          type="text"
                          name="amountRecovered"
                          id="amountRecovered"
                          placeholder="3,000,000"
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
