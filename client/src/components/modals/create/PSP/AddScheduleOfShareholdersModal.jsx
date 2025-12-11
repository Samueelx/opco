/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";
import { educationLevel, pspName } from "../../../../lib/subCountyData";

export default function AddScheduleOfShareholdersModal({
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
        "/psp-schedule-of-shareholders",
        data
      );
      console.log("Shareholder: ", response.data);

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
                    Add a Shareholder
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
                          htmlFor="shareholderName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDER NAME
                        </label>
                        <input
                          type="text"
                          name="shareholderName"
                          id="shareholderName"
                          required
                          placeholder="Gabana Holdings"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholderGender"
                          className="text-nowrap font-semibold text-sm"
                        >
                          GENDER
                        </label>
                        <select
                          name="shareholderGender"
                          id="shareholderGender"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="C">Company</option>
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholderType"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDER TYPE
                        </label>
                        <select
                          type="text"
                          name="shareholderType"
                          id="shareholderType"
                          required
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="Corporate">Corporate</option>
                          <option value="Individual">Individual</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateOfBirth"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DOB/REG DATE
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
                          htmlFor="nationalityOfShareholder"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NATIONALITY OF SHAREHOLDER
                        </label>
                        <input
                          type="text"
                          name="nationalityOfShareholder"
                          id="nationalityOfShareholder"
                          required
                          placeholder="KE"
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
                          placeholder="KE"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="countryOfIncorporation"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COUNTRY OF INCORPORATION
                        </label>
                        <input
                          type="text"
                          name="countryOfIncorporation"
                          id="countryOfIncorporation"
                          required
                          placeholder="KE"
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
                          placeholder="12345678"
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
                          placeholder="A123456789Z"
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
                          placeholder="254712345678"
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
                        <select
                          name="academicQualifications"
                          id="academicQualifications"
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select Academic qualifications</option>
                          {educationLevel.map(({code, name})=> (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="previousEmployment"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PREVIOUS EMPLOYMENT
                        </label>
                        <input
                          type="text"
                          name="previousEmployment"
                          id="previousEmployment"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="dateBecameShareholder"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE OF APPOINTMENT
                        </label>
                        <input
                          type="date"
                          name="dateBecameShareholder"
                          id="dateBecameShareholder"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="numberOfShareHeld"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHARES HELD
                        </label>
                        <input
                          type="number"
                          name="numberOfShareHeld"
                          id="numberOfShareHeld"
                          min={1}
                          placeholder="72"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareValue"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHARES VALUE
                        </label>
                        <input
                          type="text"
                          name="shareValue"
                          id="shareValue"
                          placeholder="720000000"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="percentageOfShare"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHARES PERCENTAGE
                        </label>
                        <input
                          type="number"
                          name="percentageOfShare"
                          id="percentageOfShare"
                          placeholder="32"
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
