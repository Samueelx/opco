/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import apiRequest from "../../../../lib/apiRequest";

export default function AddShareInfoModal({
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
      const response = await apiRequest.post("/shareholder-info", data);
      console.log("Shareholder Information: ", response.data);

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
                    Particulars of Shareholder Information
                  </Dialog.Title>
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="bankCode"
                          className="text-nowrap font-semibold text-sm"
                        >
                          BANK CODE
                        </label>
                        <input
                          type="text"
                          name="bankCode"
                          id="bankCode"
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
                          htmlFor="shareholderSequence"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHAREHOLDER SEQUENCE
                        </label>
                        <input
                          type="text"
                          name="shareholderSequence"
                          id="shareholderSequence"
                          required
                          placeholder="121"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="name"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NAME
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
                          htmlFor="type"
                          className="text-nowrap font-semibold text-sm"
                        >
                          MEMBER TYPE
                        </label>
                        <input
                          type="text"
                          name="type"
                          id="type"
                          required
                          placeholder="STC01"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="registrationDate"
                          className="text-nowrap font-semibold text-sm"
                        >
                          DATE OF BIRTH/REGISTRATION
                        </label>
                        <input
                          type="date"
                          name="registrationDate"
                          id="registrationDate"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
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
                          required
                          className="outline-none border p-1.5 rounded"
                          placeholder="KEN"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="residence"
                          className="text-nowrap font-semibold text-sm"
                        >
                          RESIDENCY
                        </label>
                        <input
                          type="text"
                          name="residence"
                          id="residence"
                          required
                          className="outline-none border p-1.5 rounded"
                          placeholder="KEN"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="idNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ID NUMBER
                        </label>
                        <input
                          type="text"
                          name="idNumber"
                          id="idNumber"
                          required
                          className="outline-none border p-1.5 rounded"
                          placeholder="12345678"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="address"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ADDRESS
                        </label>
                        <input
                          type="type"
                          name="address"
                          id="address"
                          placeholder="P.O. Box 1234-00200 Nairobi"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="phoneNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          CONTACT NO.
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="0712345678"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="majorPromoter"
                          className="text-nowrap font-semibold text-sm"
                        >
                          MAJOR PROMOTER
                        </label>
                        <textarea
                          type="text"
                          name="majorPromoter"
                          id="majorPromoter"
                          placeholder="1.John Doe 2.Jane Doe"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="subscribedShares"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SUBSCRIBED SHARES
                        </label>
                        <input
                          type="text"
                          name="subscribedShares"
                          id="subscribedShares"
                          required
                          className="outline-none border p-1.5 rounded"
                          placeholder="12,345,678"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareValue"
                          className="text-nowrap font-semibold text-sm"
                        >
                          SHARE VALUE
                        </label>
                        <input
                          type="text"
                          name="shareValue"
                          id="shareValue"
                          required
                          placeholder="25,000,000"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="shareholdingAmount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TOTAL SHAREHOLDING VALUE
                        </label>
                        <input
                          type="text"
                          name="shareholdingAmount"
                          id="shareholdingAmount"
                          required
                          placeholder="10,000,000"
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="paidUpShares"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PAID UP SHARES
                        </label>
                        <input
                          type="text"
                          name="paidUpShares"
                          id="paidUpShares"
                          placeholder="1,000,000"
                          required
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="percentageOfShare"
                          className="text-nowrap font-semibold text-sm"
                        >
                          PERCENTAGE OF SHARE(%)
                        </label>
                        <input
                          type="text"
                          name="percentageOfShare"
                          id="percentageOfShare"
                          required
                          placeholder="20"
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
