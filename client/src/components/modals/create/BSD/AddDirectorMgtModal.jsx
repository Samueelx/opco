/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { bankCodes, memberTypes } from "../../../../lib/bankCodesData";

export default function AddDirectorMgtModal({
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
      const response = await apiRequest.post("/director-management-info", data);
      console.log("DirectorMgt: ", response.data);

      onRecordAdded();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setErr(error.response.data.message);
      console.log(error.response.data);
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
                    Particulars Of Directors/Management Information
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
                        <select
                          name="institutionCode"
                          id="institutionCode"
                          required
                          className="outline-none border p-1.5 rounded"
                          >
                          {bankCodes.map(({code, name})=>(
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
                          htmlFor="sequenceId"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SEQUENCE ID
                        </label>
                        <input
                          type="text"
                          name="sequenceId"
                          id="sequenceId"
                          required
                          placeholder="121"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="nameOfDirector"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NAME
                        </label>
                        <input
                          type="text"
                          name="nameOfDirector"
                          id="nameOfDirector"
                          placeholder="John Doe"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="staffId"
                          className="text-nowrap font-semibold text-sm"
                        >
                          STAFF ID
                        </label>
                        <input
                          type="text"
                          name="staffId"
                          id="staffId"
                          placeholder="STF1001"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="memberType"
                          className="text-nowrap font-semibold text-sm"
                        >
                          MEMBER TYPE
                        </label>
                        <select
                          name="memberType"
                          id="memberType"
                          className="outline-none border p-1.5 rounded"
                          >
                          <option value="">Select Member Type</option>
                          {memberTypes.map(({code, name})=>(
                          <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="executiveCatType"
                          className="text-nowrap font-semibold text-sm"
                        >
                          EXECUTIVE CATEGORY TYPE
                        </label>
                        <input
                          type="text"
                          name="executiveCatType"
                          id="executiveCatType"
                          placeholder="EXTC01"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label htmlFor="gender" className="font-semibold">
                          GENDER
                        </label>

                        <select
                          name="gender"
                          id="gender"
                          className="outline-none border p-1.5 rounded"
                          required
                        >
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="nationality"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NATIONALITY
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          id="nationality"
                          className="outline-none border p-1.5 rounded"
                          placeholder="KEN"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="residency"
                          className="text-nowrap font-semibold text-sm"
                        >
                          RESIDENCY
                        </label>
                        <input
                          type="text"
                          name="residency"
                          id="residency"
                          className="outline-none border p-1.5 rounded"
                          placeholder="KEN"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="identificationNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ID NUMBER
                        </label>
                        <input
                          type="text"
                          name="identificationNumber"
                          id="identificationNumber"
                          required
                          className="outline-none border p-1.5 rounded"
                          placeholder="12345678"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="passportNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PASSPORT NO.
                        </label>
                        <input
                          type="text"
                          name="passportNumber"
                          id="passportNumber"
                          className="outline-none border p-1.5 rounded"
                          placeholder="12345678"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dob"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE OF BIRTH/REGISTRATION
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="academicQualification"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACADEMIC QUALIFICATION
                        </label>
                        <textarea
                          type="text"
                          name="academicQualification"
                          id="academicQualification"
                          required
                          placeholder="AQC01"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="profession"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PROFESSION
                        </label>
                        <input
                          type="text"
                          name="profession"
                          id="profession"
                          required
                          placeholder="PC012"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="contactNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CONTACT NO.
                        </label>
                        <input
                          type="text"
                          name="contactNumber"
                          id="contactNumber"
                          placeholder="0712345678"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="email"
                          className="text-nowrap font-semibold text-sm"
                        >
                          EMAIL
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="john.doe@gmail.com"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="appointmentDate"
                          className="text-nowrap font-semibold text-sm"
                        >
                          APPOINTMENT DATE
                        </label>
                        <input
                          type="date"
                          name="appointmentDate"
                          id="appointmentDate"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="cbkApprovalDate"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CBK APPROVAL DATE
                        </label>
                        <input
                          type="date"
                          name="cbkApprovalDate"
                          id="cbkApprovalDate"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="boardChairCommittee"
                          className="text-nowrap font-semibold text-sm"
                        >
                          BOARD CHAIR COMMITTEE
                        </label>
                        <input
                          type="text"
                          name="boardChairCommittee"
                          id="boardChairCommittee"
                          placeholder="Committee"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="boardCommitteeName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          BOARD COMMITTEE NAME
                        </label>
                        <input
                          type="text"
                          name="boardCommitteeName"
                          id="boardCommitteeName"
                          placeholder="Committee 1"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="managementCommitteeName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          MANAGEMENT COMMITTEE NAME
                        </label>
                        <input
                          type="text"
                          name="managementCommitteeName"
                          id="managementCommitteeName"
                          placeholder="Committee 1"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="companyName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="Company 1"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="roleInCompany"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ROLE IN COMPANY NAME
                        </label>
                        <input
                          type="text"
                          name="roleInCompany"
                          id="roleInCompany"
                          placeholder="Managing Director"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholdingFlag"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDING FLAG
                        </label>

                        <select
                          name="shareholdingFlag"
                          id="shareholdingFlag"
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholdingInfo"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDING INFO
                        </label>
                        <textarea
                          type="text"
                          name="shareholdingInfo"
                          id="shareholdingInfo"
                          placeholder="10000 which is 10% shareholding"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="bankingExperience"
                          className="text-nowrap font-semibold text-sm"
                        >
                          BANKING EXPERIENCE
                        </label>
                        <input
                          type="number"
                          name="bankingExperience"
                          id="bankingExperience"
                          min={0}
                          max={199}
                          required
                          placeholder="3"
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
