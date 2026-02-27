/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";

const borderPoints = [
    { code: "MLCFTBC01", name: "Land Borders" },
    { code: "MLCFTBC02", name: "Mandera (closed)" },
    { code: "MLCFTBC03", name: "Liboi (closed)" },
    { code: "MLCFTBC04", name: "Kiunga (closed)" },
    { code: "MLCFTBC05", name: "Lunga-lunga OSBPs" },
    { code: "MLCFTBC06", name: "Taveta OSBPs" },
    { code: "MLCFTBC07", name: "Loitokotok" },
    { code: "MLCFTBC08", name: "Namanga OSBPs" },
    { code: "MLCFTBC09", name: "Isebania OSBPs" },
    { code: "MLCFTBC10", name: "Sand river gate (closed)" },
    { code: "MLCFTBC11", name: "Muhuru-bay" },
    { code: "MLCFTBC12", name: "Malaba OSBPs" },
    { code: "MLCFTBC13", name: "Busia OSBPs" },
    { code: "MLCFTBC14", name: "Lwakhakha" },
    { code: "MLCFTBC15", name: "Suam" },
    { code: "MLCFTBC16", name: "Moyale OSBPs" },
    { code: "MLCFTBC17", name: "Nadapal" },
    { code: "MLCFTBC18", name: "Maritime Borders" },
    { code: "MLCFTBC19", name: "Kilindini" },
    { code: "MLCFTBC20", name: "Kilifi" },
    { code: "MLCFTBC21", name: "Shimoni" },
    { code: "MLCFTBC22", name: "Lamu" },
    { code: "MLCFTBC23", name: "Kisumu pier" },
    { code: "MLCFTBC24", name: "Mbita" },
    { code: "MLCFTBC25", name: "Ngomeni (closed)" },
    { code: "MLCFTBC26", name: "Vanga" },
    { code: "MLCFTBC27", name: "Oldport" },
    { code: "MLCFTBC28", name: "Malindi" },
    { code: "MLCFTBC29", name: "Air Borders" },
    { code: "MLCFTBC30", name: "Jomo Kenyatta International Airport" },
    { code: "MLCFTBC31", name: "Mombasa International Airport" },
    { code: "MLCFTBC32", name: "Kisumu International Airport" },
    { code: "MLCFTBC33", name: "Malindi Airport" },
    { code: "MLCFTBC34", name: "Eldoret International Airport" },
    { code: "MLCFTBC35", name: "Wilson Airport" },
    { code: "MLCFTBC36", name: "Wajir Airport" },
    { code: "MLCFTBC37", name: "Lokichogio" },
    { code: "MLCFTBC38", name: "Isiolo airport" },
    { code: "MLCFTBC39", name: "Other" },
];

const agentTypes = [
    { code: "MLCFTAG01", name: "Super Agent" },
    { code: "MLCFTAG02", name: "Agent" },
];

const transactionTypes = [
    { code: "MLCFTTT01", name: "Deposit" },
    { code: "MLCFTTT02", name: "Withdrawal" },
    { code: "MLCFTTT03", name: "Transfers" },
    { code: "MLCFTTT04", name: "Any other" },
];

export default function AddGeoLocationBorderModal({
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

        const payload = {
            ...data,
            numberOfTransactions: parseInt(data.numberOfTransactions, 10),
            valueOfTransactions: parseFloat(data.valueOfTransactions),
        };

        try {
            await apiRequest.post("/geo-location-border", [payload]);
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

    const selectClass = "outline-none border p-1.5 rounded w-full";
    const inputClass = "outline-none border p-1.5 rounded w-full";
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
                                        Add Geographical Location (Border) Record
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap gap-4 items-start justify-between">

                                            {/* PSP ID */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="pspId" className={labelClass}>PSP ID</label>
                                                <select name="pspId" id="pspId" required className={selectClass}>
                                                    {pspName.map(({ code, name }) => (
                                                        <option key={code} value={code}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Reporting Date */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="reportingDate" className={labelClass}>REPORTING DATE</label>
                                                <input type="date" name="reportingDate" id="reportingDate" required className={inputClass} />
                                            </div>

                                            {/* Border Point */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="borderPoint" className={labelClass}>BORDER POINT</label>
                                                <select name="borderPoint" id="borderPoint" required className={selectClass}>
                                                    {borderPoints.map(({ code, name }) => (
                                                        <option key={code} value={code}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Agent Type */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="agentType" className={labelClass}>AGENT TYPE</label>
                                                <select name="agentType" id="agentType" required className={selectClass}>
                                                    {agentTypes.map(({ code, name }) => (
                                                        <option key={code} value={code}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Transaction Type */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="transactionType" className={labelClass}>TRANSACTION TYPE</label>
                                                <select name="transactionType" id="transactionType" required className={selectClass}>
                                                    {transactionTypes.map(({ code, name }) => (
                                                        <option key={code} value={code}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Number of Transactions */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="numberOfTransactions" className={labelClass}>NUMBER OF TRANSACTIONS</label>
                                                <input type="number" name="numberOfTransactions" id="numberOfTransactions" placeholder="0" min="0" required className={inputClass} />
                                            </div>

                                            {/* Value of Transactions */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="valueOfTransactions" className={labelClass}>VALUE OF TRANSACTIONS</label>
                                                <input type="number" name="valueOfTransactions" id="valueOfTransactions" placeholder="0.00" min="0" step="0.01" required className={inputClass} />
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
