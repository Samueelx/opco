import { useEffect, useState } from "react";
import { AddGeoLocationCountryModal } from "../../components";
import apiRequest from "../../lib/apiRequest";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// ─── Lookup map ───────────────────────────────────────────────────────────────
const codeToDescription = {
    MLCFTCRC01: "UN Sanctioned Countries-North Korea",
    MLCFTCRC02: "UN Sanctioned Countries-Iran",
    MLCFTCRC03: "UN Sanctioned Countries-Mali",
    MLCFTCRC04: "UN Sanctioned Countries-South Sudan",
    MLCFTCRC05: "UN Sanctioned Countries-Central African Republic",
    MLCFTCRC06: "UN Sanctioned Countries-Yemen",
    MLCFTCRC07: "UN Sanctioned Countries-Guinea-Bissau",
    MLCFTCRC08: "UN Sanctioned Countries-Libya",
    MLCFTCRC09: "UN Sanctioned Countries-Eritrea",
    MLCFTCRC10: "UN Sanctioned Countries-Lebanon",
    MLCFTCRC11: "UN Sanctioned Countries-Democratic Republic of the Congo",
    MLCFTCRC12: "UN Sanctioned Countries-Sudan",
    MLCFTCRC13: "UN Sanctioned Countries-Somalia",
    MLCFTCRC14: "UN Sanctioned Countries-Iraq",
    MLCFTCRC15: "Jurisdictions listed by FATF as high-risk/non-cooperative-Iran",
    MLCFTCRC16: "Jurisdictions listed by FATF as high-risk/non-cooperative-Democratic People's Republic of Korea",
    MLCFTCRC17: "Designated Countries L.N 200 of 2015-Somalia",
    MLCFTCRC18: "Designated Countries L.N 200 of 2015-Syria",
    MLCFTCRC19: "Designated Countries L.N 200 of 2015-Yemeni",
    MLCFTCRC20: "Designated Countries L.N 200 of 2015-Libya",
    MLCFTCRC21: "Designated Countries L.N 200 of 2015-Iraq",
    MLCFTCRC22: "Designated Countries L.N 200 of 2015-Afghanistan",
    MLCFTCRC23: "Jurisdictions under Increased Monitoring by FATF-Grey list",
    MLCFTCRC24: "Other jurisdictions assessed as higher ML/TF/PF risk by the institution",
    MLCFTCRC25: "Regional countries-Tanzania",
    MLCFTCRC26: "Regional countries-South Africa",
    MLCFTCRC27: "Regional countries-Uganda",
    MLCFTCRC28: "Regional countries-Sudan",
    MLCFTCRC29: "Regional countries-Mozambique",
    MLCFTCRC30: "Any Other",
};
const getDesc = (code) => codeToDescription[code] || code;

// ─── CSV Parser ───────────────────────────────────────────────────────────────
const parseCSV = (csvText) => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        return headers.reduce((obj, h, i) => { obj[h] = values[i] ?? ""; return obj; }, {});
    });
};

// ─── Bulk Upload Modal ────────────────────────────────────────────────────────
function UploadGeoLocationCountryModal({ isOpen, setIsOpen, onRecordAdded }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    function closeModal() { setIsOpen(false); setErr(""); setFile(null); }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) { setErr("Please select a CSV file."); return; }
        setLoading(true);
        setErr("");
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonData = parseCSV(event.target.result);
                const mappedData = jsonData.map((row) => ({
                    reportingDate: String(row["Reporting Date"] || row.reportingDate || ""),
                    countryOfInterest: String(row["Countries of interest"] || row.countryOfInterest || ""),
                    numberOfInflows: Number(row["Number of inflows/transfers"] || row.numberOfInflows || 0),
                    valueOfInflows: Number(row["Value of inflows/transfers"] || row.valueOfInflows || 0),
                    numberOfOutflows: Number(row["Number of outflows/transfers"] || row.numberOfOutflows || 0),
                    valueOfOutflows: Number(row["Value of outflows/transfers"] || row.valueOfOutflows || 0),
                }));
                await apiRequest.post("/geo-location-country", mappedData);
                onRecordAdded();
                closeModal();
            } catch (error) {
                setErr(error.response?.data?.message || "Error uploading file.");
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h2" className="text-2xl font-bold text-gray-900 mb-4">
                                    Bulk Upload Geographical Location (Country)
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-4">
                                        <label htmlFor="countryCSVFile" className="block text-sm font-semibold mb-2">
                                            Select CSV File
                                        </label>
                                        <input
                                            type="file"
                                            id="countryCSVFile"
                                            accept=".csv"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            required
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                                        />
                                        <p className="mt-2 text-xs text-gray-500">
                                            CSV columns: <span className="font-mono">Reporting Date, Countries of interest, Number of inflows/transfers, Value of inflows/transfers, Number of outflows/transfers, Value of outflows/transfers</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Uploading..." : "Upload CSV"}
                                        </button>
                                    </div>
                                </form>
                                {err && <p className="text-red-400 italic mt-2">{err}</p>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

// ─── Table Header ─────────────────────────────────────────────────────────────
function GeoLocationCountryHeader() {
    const cols = [
        "Reporting Date", "Country of Interest",
        "No. of Inflows/Transfers", "Value of Inflows/Transfers (KES)",
        "No. of Outflows/Transfers", "Value of Outflows/Transfers (KES)",
    ];
    return (
        <thead className="bg-gray-50">
            <tr>
                {cols.map((c) => (
                    <th key={c} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {c}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const GeoLocationCountry = () => {
    const [data, setData] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isCsvOpen, setIsCsvOpen] = useState(false);
    const [reportingDate, setReportingDate] = useState("");

    const fetchData = async () => {
        try {
            const res = await apiRequest.get("/geo-location-country");
            setData(res.data);
        } catch (err) {
            console.error("Error fetching Geo Location Country data:", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = reportingDate
        ? data.filter((r) => r.reportingDate === reportingDate)
        : data;

    const fmt = (n) => (n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
            <div className="flex justify-center flex-col gap-5 w-full">
                <h2 className="text-3xl text-center">AML/CFT Geographical Location Analysis (Country)</h2>

                {/* Filter bar */}
                <div className="p-4 flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex gap-2 items-center">
                        <h5 className="font-semibold">Select a Reporting Date:</h5>
                        <input
                            type="date"
                            className="border border-red-500 rounded px-2 py-1"
                            value={reportingDate}
                            onChange={(e) => setReportingDate(e.target.value)}
                        />
                        {reportingDate && (
                            <button onClick={() => setReportingDate("")} className="text-xs text-gray-500 underline">
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {filtered.length > 0 ? (
                        <table className="border-collapse w-full mb-10">
                            <GeoLocationCountryHeader />
                            <tbody>
                                {filtered.map((item) => (
                                    <tr key={item.rowId} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.reportingDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{getDesc(item.countryOfInterest)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{(item.numberOfInflows ?? 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{fmt(item.valueOfInflows)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{(item.numberOfOutflows ?? 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{fmt(item.valueOfOutflows)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex-center p-4">
                            <p className="text-lg font-semibold italic text-red-500">
                                {reportingDate ? `No data found for: ${reportingDate}` : "No records found."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex-center gap-20">
                    <button
                        onClick={() => setIsAddOpen(true)}
                        type="button"
                        className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setIsCsvOpen(true)}
                        type="button"
                        className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
                    >
                        Bulk Add
                    </button>
                </div>
            </div>

            <AddGeoLocationCountryModal
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                onRecordAdded={fetchData}
            />
            <UploadGeoLocationCountryModal
                isOpen={isCsvOpen}
                setIsOpen={setIsCsvOpen}
                onRecordAdded={fetchData}
            />
        </div>
    );
};

export default GeoLocationCountry;
