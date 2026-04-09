import { useEffect, useState } from "react";
import { AddCustomerAnalysisModal } from "../../components";
import apiRequest from "../../lib/apiRequest";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// ─── Lookup maps ─────────────────────────────────────────────────────────────
const codeToDescription = {
    MLCFTCTC01: "Individual",
    MLCFTCT02: "Corporate",
    MLCFTCT03: "Merchants",
    MLCFTCCO1: "Resident",
    MLCFTCCO2: "Non Resident",
    MLCFTCCO3: "Domestic PEPS",
    MLCFTCCO4: "Foreign PEPS",
    MLCFTCCO5: "Other High Risks",
    MLCFTCCO6: "Total legal entities",
    MLCFTCCO7: "NPOs",
    MLCFTCCO8: "NPOs at Risk",
    MLCFTCCO9: "Entities (Associated with PEPs-Domestic)",
    MLCFTCCO10: "Entities (Associated with PEPs-Foreign)",
    MLCFTCCO11: "Trust/Charities",
    MLCFTCCO12: "Petroleum",
    MLCFTCCO13: "Real Estate",
    MLCFTCCO14: "Dealers in precious Stones",
    MLCFTCCO15: "Legal and Profession Services",
    MLCFTCCO16: "Payments Service Providers",
    MLCFTCCO17: "Virtual Assets Providers",
    MLCFTCCO18: "Motor Vehicle Dealers",
    MLCFTCCO19: "Other High risk customer",
    MLCFTCCO20: "Merchants",
    MLCFTTTO1: "Deposit",
    MLCFTTTO2: "Withdrawal",
    MLCFTTTO3: "Transfers",
    MLCFTTTO4: "Any other",
};
const getDesc = (code) => codeToDescription[code] || code;

// ─── Inline CSV Upload Modal ──────────────────────────────────────────────────
const parseCSV = (csvText) => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        return headers.reduce((obj, h, i) => { obj[h] = values[i] ?? ""; return obj; }, {});
    });
};

function UploadCustomerAnalysisModal({ isOpen, setIsOpen, onRecordAdded }) {
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
                    customerType: String(row["Customer type"] || row.customerType || ""),
                    customerCategory: String(row["Customer category"] || row.customerCategory || ""),
                    transactionType: String(row["Transaction type"] || row.transactionType || ""),
                    numberOfCustomers: Number(row["Number of customers"] || row.numberOfCustomers || 0),
                    numberOfTransactions: Number(row["Number of transactions"] || row.numberOfTransactions || 0),
                    valueOfTransactions: Number(row["Value of transactions"] || row.valueOfTransactions || 0),
                }));
                await apiRequest.post("/customer-analysis", mappedData);
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
                                    Bulk Upload Customer Analysis
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-4">
                                        <label htmlFor="csvFile" className="block text-sm font-semibold mb-2">
                                            Select CSV File
                                        </label>
                                        <input
                                            type="file"
                                            id="csvFile"
                                            accept=".csv"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            required
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                                        />
                                        <p className="mt-2 text-xs text-gray-500">
                                            CSV columns: <span className="font-mono">Reporting Date, Customer type, Customer category, Transaction type, Number of customers, Number of transactions, Value of transactions</span>
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
function CustomerAnalysisHeader() {
    const cols = [
        "Reporting Date", "Customer Type", "Customer Category",
        "Transaction Type", "No. of Customers", "No. of Transactions", "Value (KES)",
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
const CustomerAnalysis = () => {
    const [data, setData] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isCsvOpen, setIsCsvOpen] = useState(false);
    const [reportingDate, setReportingDate] = useState("");

    const fetchData = async () => {
        try {
            const res = await apiRequest.get("/customer-analysis");
            setData(res.data);
        } catch (err) {
            console.error("Error fetching customer analysis data:", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = reportingDate
        ? data.filter((r) => r.reportingDate === reportingDate)
        : data;

    return (
        <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
            <div className="flex justify-center flex-col gap-5 w-full">
                <h2 className="text-3xl text-center">AML/CFT Customer Analysis</h2>

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
                            <button
                                onClick={() => setReportingDate("")}
                                className="text-xs text-gray-500 underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {filtered.length > 0 ? (
                        <table className="border-collapse w-full mb-10">
                            <CustomerAnalysisHeader />
                            <tbody>
                                {filtered.map((item) => (
                                    <tr key={item.rowId} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.reportingDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{getDesc(item.customerType)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{getDesc(item.customerCategory)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{getDesc(item.transactionType)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{(item.numberOfCustomers ?? 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{(item.numberOfTransactions ?? 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {(item.valueOfTransactions ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
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

            <AddCustomerAnalysisModal
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                onRecordAdded={fetchData}
            />
            <UploadCustomerAnalysisModal
                isOpen={isCsvOpen}
                setIsOpen={setIsCsvOpen}
                onRecordAdded={fetchData}
            />
        </div>
    );
};

export default CustomerAnalysis;
