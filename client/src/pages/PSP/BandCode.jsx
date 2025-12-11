// import { useEffect, useState } from "react";
// import { PSPTariff, PSPTariffHeader } from "../../components";
// import apiRequest from "../../lib/apiRequest";
// import { useParams } from "react-router-dom";

// function BandCode() {
//   const [tariff, setTariff] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchTariffData();
//   }, []);

//   const fetchTariffData = async () => {
//     try {
//       const tariffData = await apiRequest.get(`/band-codes/${id}`);
//       setTariff(tariffData.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const result = [];

//   for (const date in tariff) {
//     for (const band in tariff[date]) {
//       const item = {
//         ...tariff[date][band],
//       };
//       result.push(item);
//     }
//   }

//   return (
//     <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
//       <div className="flex justify-center flex-col gap-5 w-full">
//         <h2 className="text-3xl text-center">Tariffs</h2>

//         <div className="overflow-x-auto">
//           <table className="border-collapse w-full mb-10 relative">
//             <PSPTariffHeader />

//             {result &&
//               result.map((row,i) => (
//                 <PSPTariff key={`bandCode-${i}`} row={row} />
//               ))}
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BandCode;


import { useEffect, useState } from "react";
import { PSPTariff, PSPTariffHeader } from "../../components";
import apiRequest from "../../lib/apiRequest";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function BandCode() {
  const [tariff, setTariff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTariffData();
  }, [id]);

  const fetchTariffData = async () => {
    try {
      setLoading(true);
      setError("");
      const tariffData = await apiRequest.get(`/band-codes/${id}`);
      setTariff(tariffData.data);
    } catch (error) {
      setError("Failed to load tariff data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await apiRequest.delete(`/band-codes/${id}`);
      setIsDeleteModalOpen(false);
      navigate("/band-codes");
    } catch (error) {
      setError("Failed to delete tariff");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const result = [];
  if (tariff) {
    for (const date in tariff) {
      for (const band in tariff[date]) {
        const item = {
          ...tariff[date][band],
        };
        result.push(item);
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin text-2xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-3xl">Tariffs</h2>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Tariff
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md border border-red-200 mx-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="border-collapse w-full mb-10 relative">
          <PSPTariffHeader />
          {result && result.map((row, i) => (
            <PSPTariff key={`bandCode-${i}`} row={row} />
          ))}
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this band code? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteModalOpen(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <span className="flex items-center space-x-2">
                          <span className="animate-spin">⏳</span>
                          <span>Deleting...</span>
                        </span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default BandCode;