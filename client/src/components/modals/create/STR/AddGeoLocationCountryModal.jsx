/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { pspName } from "../../../../lib/subCountyData";

const countriesOfInterest = [
    { code: "MLCFTCRC01", name: "UN Sanctioned Countries-North Korea" },
    { code: "MLCFTCRC02", name: "UN Sanctioned Countries-Iran" },
    { code: "MLCFTCRC03", name: "UN Sanctioned Countries-Mali" },
    { code: "MLCFTCRC04", name: "UN Sanctioned Countries-South Sudan" },
    { code: "MLCFTCRC05", name: "UN Sanctioned Countries-Central African Republic" },
    { code: "MLCFTCRC06", name: "UN Sanctioned Countries-Yemen" },
    { code: "MLCFTCRC07", name: "UN Sanctioned Countries-Guinea-Bissau" },
    { code: "MLCFTCRC08", name: "UN Sanctioned Countries-Libya" },
    { code: "MLCFTCRC09", name: "UN Sanctioned Countries-Eritrea" },
    { code: "MLCFTCRC10", name: "UN Sanctioned Countries-Lebanon" },
    { code: "MLCFTCRC11", name: "UN Sanctioned Countries-Democratic Republic of the Congo" },
    { code: "MLCFTCRC12", name: "UN Sanctioned Countries-Sudan" },
    { code: "MLCFTCRC13", name: "UN Sanctioned Countries-Somalia" },
    { code: "MLCFTCRC14", name: "UN Sanctioned Countries-Iraq" },
    { code: "MLCFTCRC15", name: "Jurisdictions listed by FATF as high-risk/non-cooperative-Iran" },
    { code: "MLCFTCRC16", name: "Jurisdictions listed by FATF as high-risk/non-cooperative-Democratic People's Republic of Korea" },
    { code: "MLCFTCRC17", name: "Designated Countries L.N 200 of 2015-Somalia" },
    { code: "MLCFTCRC18", name: "Designated Countries L.N 200 of 2015-Syria" },
    { code: "MLCFTCRC19", name: "Designated Countries L.N 200 of 2015-Yemeni" },
    { code: "MLCFTCRC20", name: "Designated Countries L.N 200 of 2015-Libya" },
    { code: "MLCFTCRC21", name: "Designated Countries L.N 200 of 2015-Iraq" },
    { code: "MLCFTCRC22", name: "Designated Countries L.N 200 of 2015-Afghanistan" },
    { code: "MLCFTCRC23", name: "Jurisdictions under Increased Monitoring by FATF-Grey list" },
    { code: "MLCFTCRC24", name: "Other jurisdictions assessed as higher ML/TF/PF risk by the institution" },
    { code: "MLCFTCRC25", name: "Regional countries-Tanzania" },
    { code: "MLCFTCRC26", name: "Regional countries-South Africa" },
    { code: "MLCFTCRC27", name: "Regional countries-Uganda" },
    { code: "MLCFTCRC28", name: "Regional countries-Sudan" },
    { code: "MLCFTCRC29", name: "Regional countries-Mozambique" },
    { code: "MLCFTCRC30", name: "Any Other" },
];

export default function AddGeoLocationCountryModal({
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
            numberOfInflows: parseInt(data.numberOfInflows, 10),
            valueOfInflows: parseFloat(data.valueOfInflows),
            numberOfOutflows: parseInt(data.numberOfOutflows, 10),
            valueOfOutflows: parseFloat(data.valueOfOutflows),
        };

        try {
            await apiRequest.post("/geo-location-country", [payload]);
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
                                        Add Geographical Location (Country) Record
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

                                            {/* Country of Interest */}
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="countryOfInterest" className={labelClass}>COUNTRY OF INTEREST</label>
                                                <select name="countryOfInterest" id="countryOfInterest" required className={selectClass}>
                                                    {countriesOfInterest.map(({ code, name }) => (
                                                        <option key={code} value={code}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Number of Inflows */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="numberOfInflows" className={labelClass}>NO. OF INFLOWS/TRANSFERS</label>
                                                <input type="number" name="numberOfInflows" id="numberOfInflows" placeholder="0" min="0" required className={inputClass} />
                                            </div>

                                            {/* Value of Inflows */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="valueOfInflows" className={labelClass}>VALUE OF INFLOWS/TRANSFERS</label>
                                                <input type="number" name="valueOfInflows" id="valueOfInflows" placeholder="0.00" min="0" step="0.01" required className={inputClass} />
                                            </div>

                                            {/* Number of Outflows */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="numberOfOutflows" className={labelClass}>NO. OF OUTFLOWS/TRANSFERS</label>
                                                <input type="number" name="numberOfOutflows" id="numberOfOutflows" placeholder="0" min="0" required className={inputClass} />
                                            </div>

                                            {/* Value of Outflows */}
                                            <div className="flex flex-col w-56">
                                                <label htmlFor="valueOfOutflows" className={labelClass}>VALUE OF OUTFLOWS/TRANSFERS</label>
                                                <input type="number" name="valueOfOutflows" id="valueOfOutflows" placeholder="0.00" min="0" step="0.01" required className={inputClass} />
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
