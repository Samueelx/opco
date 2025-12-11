/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";
import { disclosureCodes } from "../../../../lib/bankCodesData";

export default function EditPSPScheduleOfTrusteesModal({
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
        `/psp-schedule-of-trustees/${trustAcc.rowId}`,
        data
      );
      console.log("Trustee: ", response.data);

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
                    Edit Trustee Details
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
                          htmlFor="trustCompanyName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TRUST CO NAME
                        </label>
                        <input
                          type="text"
                          name="trustCompanyName"
                          id="trustCompanyName"
                          required
                          defaultValue={trustAcc.trustCompanyName}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="directorsOfTrustCo"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DIRECTOR OF TRUST CO
                        </label>
                        <input
                          type="text"
                          name="directorsOfTrustCo"
                          id="directorsOfTrustCo"
                          required
                          defaultValue={trustAcc.directorsOfTrustCo}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="trusteeNames"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TRUSTEE
                        </label>
                        <input
                          type="text"
                          name="trusteeNames"
                          id="trusteeNames"
                          required
                          defaultValue={trustAcc.trusteeNames}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="trustGender"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TRUSTEE&apos;S GENDER
                        </label>
                        <select
                          name="trustGender"
                          id="trustGender"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateOfBirth"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE OF BIRTH
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="nationalityOfTrustee"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NATIONALITY
                        </label>
                        <input
                          type="text"
                          name="nationalityOfTrustee"
                          id="nationalityOfTrustee"
                          required
                          defaultValue={trustAcc.nationalityOfTrustee}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="residenceOfShareholder"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COUNTRY OF RESIDENCE
                        </label>
                        <input
                          type="text"
                          name="residenceOfShareholder"
                          id="residenceOfShareholder"
                          required
                          defaultValue={trustAcc.residenceOfShareholder}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="idNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ID/PASSPORT NUMBER
                        </label>
                        <input
                          type="text"
                          name="idNumber"
                          id="idNumber"
                          required
                          defaultValue={trustAcc.idNumber}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="kraPin"
                          className="text-nowrap font-semibold text-sm"
                        >
                          KRA PIN NUMBER
                        </label>
                        <input
                          type="text"
                          name="kraPin"
                          id="kraPin"
                          required
                          defaultValue={trustAcc.kraPin}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="contact"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CONTACT
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          required
                          defaultValue={trustAcc.contact}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="academicQualifications"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACADEMIC/PROF QUALIFICATIONS
                        </label>
                        <input
                          type="text"
                          name="academicQualifications"
                          id="academicQualifications"
                          required
                          defaultValue={trustAcc.academicQualifications}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="otherTrusteeships"
                          className="text-nowrap font-semibold text-sm"
                        >
                          OTHER TRUSTEESHIPS
                        </label>
                        <textarea
                          type="text"
                          name="otherTrusteeships"
                          id="otherTrusteeships"
                          defaultValue={trustAcc.otherTrusteeships}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="disclosureDetails"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DISCLOSURE & TRANSPARENCY DETAILS
                        </label>
                        <select
                          name="disclosureDetails"
                          id="disclosureDetails"
                          className="outline-none border p-1.5 rounded"
                        >
                          {disclosureCodes.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholderOfTrust"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDER NAME
                        </label>
                        <input
                          type="text"
                          name="shareholderOfTrust"
                          id="shareholderOfTrust"
                          required
                          defaultValue={trustAcc.shareholderOfTrust}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="percentageOfShareholding"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHARES PERCENTAGE
                        </label>
                        <input
                          type="number"
                          name="percentageOfShareholding"
                          id="percentageOfShareholding"
                          defaultValue={trustAcc.percentageOfShareholding}
                          min={0}
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
