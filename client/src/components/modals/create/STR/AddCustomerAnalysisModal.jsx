/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";

const customerTypes = [
    { code: "MLCFTCTC01", name: "Individual" },
    { code: "MLCFTCT02", name: "Corporate" },
    { code: "MLCFTCT03", name: "Merchants" },
];

const customerCategories = [
    { code: "MLCFTCCO1", name: "Resident" },
    { code: "MLCFTCCO2", name: "Non Resident" },
    { code: "MLCFTCCO3", name: "Domestic PEPS" },
    { code: "MLCFTCCO4", name: "Foreign PEPS" },
    { code: "MLCFTCCO5", name: "Other High Risks" },
    { code: "MLCFTCCO6", name: "Total legal entities" },
    { code: "MLCFTCCO7", name: "NPOs" },
    { code: "MLCFTCCO8", name: "NPOs at Risk" },
    { code: "MLCFTCCO9", name: "Entities (Associated with PEPs-Domestic)" },
    { code: "MLCFTCCO10", name: "Entities (Associated with PEPs-Foreign)" },
    { code: "MLCFTCCO11", name: "Trust/Charities" },
    { code: "MLCFTCCO12", name: "Petroleum" },
    { code: "MLCFTCCO13", name: "Real Estate" },
    { code: "MLCFTCCO14", name: "Dealers in precious Stones" },
    { code: "MLCFTCCO15", name: "Legal and Profession Services" },
    { code: "MLCFTCCO16", name: "Payments Service Providers" },
    { code: "MLCFTCCO17", name: "Virtual Assets Providers" },
    { code: "MLCFTCCO18", name: "Motor Vehicle Dealers" },
    { code: "MLCFTCCO19", name: "Other High risk customer" },
    { code: "MLCFTCCO20", name: "Merchants" },
];

const transactionTypes = [
    { code: "MLCFTTT01", name: "Deposit" },
    { code: "MLCFTTT02", name: "Withdrawal" },
    { code: "MLCFTTT03", name: "Transfers" },
    { code: "MLCFTTT04", name: "Any other" },
];

export default function AddCustomerAnalysisModal({
    isOpen,
    setIsOpen,
    onRecordAdded,
}) {
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    function closeModal() {
        setIsOpen(false);
        setErr("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Coerce numeric fields
        const payload = {
            ...data,
            numberOfCustomers: parseInt(data.numberOfCustomers, 10),
            numberOfTransactions: parseInt(data.numberOfTransactions, 10),
            valueOfTransactions: parseFloat(data.valueOfTransactions),
        };

        try {
            await apiRequest.post("/customer-analysis", [payload]);
            onRecordAdded();
            setLoading(false);
            setIsOpen(false);
            e.target.reset();
        } catch (error) {
            console.error("Error:", error);
            setErr(error.response?.data?.message || "An error occurred");
            setLoading(false);
        }
    };

    const selectClass =
        "outline-none border p-1.5 rounded w-full";
    const inputClass =
        "outline-none border p-1.5 rounded w-full";
    const labelClass = "font-semibold text-sm mb-1 block";

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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h2"
                                        className="text-2xl font-bold text-gray-900 mb-4"
                                    >
                                        Add Customer Analysis Record
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap gap-4 items-start justify-between">
                                            {/* PSP ID */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="pspId" className={labelClass}>
                                                    PSP ID
                                                </label>
                                                <select name="pspId" id="pspId" required className={selectClass}>
                                                    {pspName.map(({ code, name }) => (
                                                        <option key={code} value={code}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Reporting Date */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="reportingDate" className={labelClass}>
                                                    REPORTING DATE
                                                </label>
                                                <input
                                                    type="date"
                                                    name="reportingDate"
                                                    id="reportingDate"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>

                                            {/* Customer Type */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="customerType" className={labelClass}>
                                                    CUSTOMER TYPE
                                                </label>
                                                <select name="customerType" id="customerType" required className={selectClass}>
                                                    {customerTypes.map(({ code, name }) => (
                                                        <option key={code} value={code}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Customer Category */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="customerCategory" className={labelClass}>
                                                    CUSTOMER CATEGORY
                                                </label>
                                                <select name="customerCategory" id="customerCategory" required className={selectClass}>
                                                    {customerCategories.map(({ code, name }) => (
                                                        <option key={code} value={code}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Transaction Type */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="transactionType" className={labelClass}>
                                                    TRANSACTION TYPE
                                                </label>
                                                <select name="transactionType" id="transactionType" required className={selectClass}>
                                                    {transactionTypes.map(({ code, name }) => (
                                                        <option key={code} value={code}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Number of Customers */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="numberOfCustomers" className={labelClass}>
                                                    NUMBER OF CUSTOMERS
                                                </label>
                                                <input
                                                    type="number"
                                                    name="numberOfCustomers"
                                                    id="numberOfCustomers"
                                                    placeholder="0"
                                                    min="0"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>

                                            {/* Number of Transactions */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="numberOfTransactions" className={labelClass}>
                                                    NUMBER OF TRANSACTIONS
                                                </label>
                                                <input
                                                    type="number"
                                                    name="numberOfTransactions"
                                                    id="numberOfTransactions"
                                                    placeholder="0"
                                                    min="0"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>

                                            {/* Value of Transactions */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="valueOfTransactions" className={labelClass}>
                                                    VALUE OF TRANSACTIONS
                                                </label>
                                                <input
                                                    type="number"
                                                    name="valueOfTransactions"
                                                    id="valueOfTransactions"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                                            >
                                                {loading ? "Saving..." : "Save Record"}
                                            </button>
                                        </div>
                                    </form>
                                    {err && <p className="text-red-400 italic mt-3">{err}</p>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
