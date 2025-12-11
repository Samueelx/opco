// /* eslint-disable react/prop-types */
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import csv from "csvtojson";
// import fs from "fs";

// import apiRequest from "../../../../lib/apiRequest";

// export default function UploadTariffsModal({
//   isOpen,
//   setIsOpen,
//   onRecordAdded,
// }) {
//   const [err, setErr] = useState("");
//   const [reportingDate, setReportingDate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [jsonArray, setJsonArray] = useState([]);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   setErr("");
//   //   setLoading(true);

//   //   if (!file) {
//   //     alert("Please select a file first!");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const reader = new FileReader()

//   //   reader.onload =

//   //   try {
//   //     const response = await apiRequest.post(
//   //       "/psp-schedule-of-trustees/upload-csv",
//   //       formData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );
//   //     console.log("CSV file uploaded successfully!", response.data);
//   //     setLoading(false);
//   //     setIsOpen(false);
//   //     onRecordAdded();
//   //   } catch (error) {
//   //     console.error("Error uploading file: ", error);
//   //     alert("Error uploading file");
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setErr("");
//     setLoading(true);

//     if (!file) {
//       alert("Please select a file first!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const csvString = event.target.result;
//         const jsonArray = await csv().fromString(csvString);

//         // Convert jsonArray to the desired format
//         let result = {};

//         jsonArray.forEach((row) => {
//           const date = row.REPORTING_DATE;
//           const bandCode = row.BAND_CODE;

//           if (!result[date]) {
//             result[date] = {};
//           }

//           result[date][bandCode] = {
//             ROW_ID: row.ROW_ID,
//             PSP_ID: row.PSP_ID,
//             BAND_CODE: row.BAND_CODE,
//             REPORTING_DATE: row.REPORTING_DATE,
//             P2P_ON_NET_REGISTERED_WALLET: row.P2P_ON_NET_REGISTERED_WALLET,
//             P2P_ON_NET_NON_REG_WALLET: row.P2P_ON_NET_NON_REG_WALLET,
//             P2P_OFF_NET_REG_WALLET: row.P2P_OFF_NET_REG_WALLET,
//             P2P_OFF_NET_NON_REG_WALLET: row.P2P_OFF_NET_NON_REG_WALLET,
//             CASH_WITHDRAWAL_MOB_MONEY_AGENT:
//               row.CASH_WITHDRAWAL_MOB_MONEY_AGENT,
//             CASH_WITHDRAWALS_BANK_ATMS: row.CASH_WITHDRAWALS_BANK_ATMS,
//             AGENT_COM_CASH_OUT_REG_CUST: row.AGENT_COM_CASH_OUT_REG_CUST,
//             AGENT_COM_CASH_OUT_UNREG_CUST: row.AGENT_COM_CASH_OUT_UNREG_CUST,
//             AGENTS_COMMISSION_FOR_CASH_IN: row.AGENTS_COMMISSION_FOR_CASH_IN,
//             ATM_COMMISSION_FOR_CASH_OUT: row.ATM_COMMISSION_FOR_CASH_OUT,
//             ATM_COMMISSION_FOR_CASH_IN: row.ATM_COMMISSION_FOR_CASH_IN,
//             B2C_PAY_BILL_TYPE_1_CUSTOMER: row.B2C_PAY_BILL_TYPE_1_CUSTOMER,
//             B2C_PAYMENT_PBILL_TYPE_2_CUST: row.B2C_PAYMENT_PBILL_TYPE_2_CUST,
//             B2C_PAYMENT_PBILL_TYPE_2_BUS: row.B2C_PAYMENT_PBILL_TYPE_2_BUS,
//             B2C_PAYMENT_PBILL_TYPE_3_BUS: row.B2C_PAYMENT_PBILL_TYPE_3_BUS,
//             C2B_PAY_BILL_TYPE_1_CUSTOMER: row.C2B_PAY_BILL_TYPE_1_CUSTOMER,
//             C2B_PAYMENT_PBILL_TYPE_2_CUST: row.C2B_PAYMENT_PBILL_TYPE_2_CUST,
//             C2B_PAYMENT_PBILL_TYPE_2_BUS: row.C2B_PAYMENT_PBILL_TYPE_2_BUS,
//             C2B_PAYMENT_PBILL_TYPE_3_BUS: row.C2B_PAYMENT_PBILL_TYPE_3_BUS,
//             B2B_PAY_BILL_TYPE_1_CUSTOMER: row.B2B_PAY_BILL_TYPE_1_CUSTOMER,
//             B2B_PAYMENT_PBILL_TYPE_2_CUST: row.B2B_PAYMENT_PBILL_TYPE_2_CUST,
//             B2B_PAYMENT_P_BILL_TYPE_2_BUS: row.B2B_PAYMENT_P_BILL_TYPE_2_BUS,
//             B2B_PAYMENT_PAY_BILL_TYPE_3: row.B2B_PAYMENT_PAY_BILL_TYPE_3,
//             B2C_PAYMENT_BANK_AGGREG_CODE: row.B2C_PAYMENT_BANK_AGGREG_CODE,
//             C2B_PAYMENT_BANK_AGGREG_CODE: row.C2B_PAYMENT_BANK_AGGREG_CODE,
//             TILL_NUMBER_PAYMENTS: row.TILL_NUMBER_PAYMENTS,
//             CROSS_BORDER_INT_MNY_TRANS_OUT: row.CROSS_BORDER_INT_MNY_TRANS_OUT,
//             CROSS_BORDER_INT_MNY_TRANS_IN: row.CROSS_BORDER_INT_MNY_TRANS_IN,
//             P2P_OUTGOING_REG_PARTNER_NET: row.P2P_OUTGOING_REG_PARTNER_NET,
//           };
//         });

//         // Log the structured JSON object (for demonstration)
//         // console.log(result);

//         // Optionally, set the structured JSON object in state or do further processing
//         setJsonArray(result);
//         setReportingDate(Object.keys(result)[0]);

//         setLoading(false);
//       };
//       const data = {
//         reportingDate: reportingDate,
//         tariff: JSON.stringify(jsonArray),
//       };
//       console.log("tariff: ", data.tariff)
//       const response = await apiRequest.post("/band-codes", data);
//       console.log("Tariff: ", response.data);
//       // console.log("Data: ", data);
//       reader.readAsText(file);
//     } catch (error) {
//       console.error("Error converting CSV to JSON:", error);
//       setErr("Error converting CSV to JSON.");
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <div className="flex items-center justify-between">
//                   <Dialog.Title
//                     as="h2"
//                     className="text-2xl font-bold text-gray-900"
//                     >
//                     Upload Tariff{" "}
//                   </Dialog.Title>

//                   <a href="/tariffs.csv" download={"tariffs.csv"} className="hover:underline italic text-sm">Tariff_sample_data.csv</a>
//                   </div>

//                   <form
//                     className="mt-3"
//                     onSubmit={handleSubmit}
//                     encType="multipart/form-data"
//                   >
//                     <input
//                       type="file"
//                       name="file"
//                       accept=".csv"
//                       onChange={handleFileChange}
//                       required
//                     />

//                     <div className="mt-4">
//                       <button
//                         type="submit"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       >
//                         {loading ? "Uploading CSV..." : "Upload CSV"}
//                       </button>
//                     </div>
//                   </form>
//                   {err && <p className="text-red-400 italic">{err}</p>}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }


import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import csv from "csvtojson";

import apiRequest from "../../../../lib/apiRequest";

export default function UploadTariffsModal({
  isOpen,
  setIsOpen,
  onRecordAdded,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setError("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.name.endsWith('.csv')) {
      setError("Please select a CSV file");
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const processCSVData = async (csvString) => {
    const jsonArray = await csv().fromString(csvString);
    const result = jsonArray.reduce((acc, row) => {
      const date = row.REPORTING_DATE;
      const bandCode = row.BAND_CODE;

      if (!date || !bandCode) {
        throw new Error("CSV is missing required REPORTING_DATE or BAND_CODE columns");
      }

      if (!acc[date]) {
        acc[date] = {};
      }

      acc[date][bandCode] = Object.keys(row).reduce((obj, key) => {
        obj[key] = row[key];
        return obj;
      }, {});

      return acc;
    }, {});

    return {
      reportingDate: Object.keys(result)[0],
      tariff: JSON.stringify(result)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const csvString = event.target.result;
          const data = await processCSVData(csvString);
          const response = await apiRequest.post("/band-codes", data);
          
          if (response.status === 200 || response.status === 201) {
            onRecordAdded();
            closeModal();
          } else {
            throw new Error("Failed to upload tariff data");
          }
        } catch (error) {
          setError(error.message || "Error processing CSV data");
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setLoading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
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
              <Dialog.Panel className="w-full max-w-6xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Upload Tariff
                  </Dialog.Title>
                  <div className="flex flex-col">
                    <a 
                      href="/csv/tariffs.csv" 
                      download="tariffs.csv" 
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                      Report template (CSV)
                    </a>
                    <small className="text-red-600 italic text-[10px]">All columns are mandatory*</small>
                    </div>
                </div>

                {error && (
                  <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading || !file}
                    >
                      {loading ? (
                        <span className="flex items-center space-x-2">
                          <span className="animate-spin">⏳</span>
                          <span>Processing...</span>
                        </span>
                      ) : (
                        "Upload CSV"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}