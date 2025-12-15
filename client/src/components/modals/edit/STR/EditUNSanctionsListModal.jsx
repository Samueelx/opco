/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";

export default function EditUNSanctionsListModal({
  isOpen,
  setIsOpen,
  record,
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
        `/un-sanctions-list/${record.rowId}`,
        data
      );
      console.log("UN Sanctions List Updated: ", response.data);

      onRecordAdded();
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log("Error:", error);
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
                    Edit UN Sanctions List Record
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
                          defaultValue={record.pspId}
                          className="outline-none border p-1.5 rounded"
                        >
                          {pspName.map(({ code, name }) => (
                            <option key={code} value={code}>
                              {name}
                            </option>
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
                          defaultValue={record.reportingDate}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="typeOfTransaction"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TYPE OF TRANSACTION
                        </label>
                        <select
                          name="typeOfTransaction"
                          id="typeOfTransaction"
                          required
                          defaultValue={record.typeOfTransaction}
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select...</option>
                          <option value="MLCFTTT01">Deposit</option>
                          <option value="MLCFTTT02">Withdrawal</option>
                          <option value="MLCFTTT03">Transfers</option>
                          <option value="MLCFTTT04">Any other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="typeOfAccountInvolved"
                          className="text-nowrap font-semibold text-sm"
                        >
                          TYPE OF ACCOUNT
                        </label>
                        <select
                          name="typeOfAccountInvolved"
                          id="typeOfAccountInvolved"
                          required
                          defaultValue={record.typeOfAccountInvolved}
                          className="outline-none border p-1.5 rounded"
                        >
                          <option value="">Select...</option>
                          <option value="MLCFTATC01">Bank</option>
                          <option value="MLCFTATC02">Mobile</option>
                          <option value="MLCFTATC03">Any other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="nameOfPersonListedInUNSCList"
                          className="text-nowrap font-semibold text-sm"
                        >
                          NAME IN UNSC LIST
                        </label>
                        <input
                          type="text"
                          name="nameOfPersonListedInUNSCList"
                          id="nameOfPersonListedInUNSCList"
                          required
                          defaultValue={record.nameOfPersonListedInUNSCList}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="accountName"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACCOUNT NAME
                        </label>
                        <input
                          type="text"
                          name="accountName"
                          id="accountName"
                          required
                          defaultValue={record.accountName}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="accountNumber"
                          className="text-nowrap font-semibold text-sm"
                        >
                          ACCOUNT NUMBER
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          id="accountNumber"
                          required
                          defaultValue={record.accountNumber}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="nameOfFinancialInstitution"
                          className="text-nowrap font-semibold text-sm"
                        >
                          FINANCIAL INSTITUTION
                        </label>
                        <input
                          type="text"
                          name="nameOfFinancialInstitution"
                          id="nameOfFinancialInstitution"
                          required
                          defaultValue={record.nameOfFinancialInstitution}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="financialInstitutionsInvolved"
                          className="text-nowrap font-semibold text-sm"
                        >
                          INSTITUTIONS INVOLVED
                        </label>
                        <input
                          type="text"
                          name="financialInstitutionsInvolved"
                          id="financialInstitutionsInvolved"
                          required
                          defaultValue={record.financialInstitutionsInvolved}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="countriesInvolvedInTransaction"
                          className="text-nowrap font-semibold text-sm"
                        >
                          COUNTRIES INVOLVED
                        </label>
                        <input
                          type="text"
                          name="countriesInvolvedInTransaction"
                          id="countriesInvolvedInTransaction"
                          required
                          defaultValue={record.countriesInvolvedInTransaction}
                          className="outline-none border p-1.5 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-56">
                        <label
                          htmlFor="amount"
                          className="text-nowrap font-semibold text-sm"
                        >
                          AMOUNT (KSH &apos;000)
                        </label>
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          required
                          defaultValue={record.amount}
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