import { useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { AddScheduleOfCustomerComplaintsModal, PSPScheduleOfCustomerComplaintsHeader, PSPScheduleOfCustomerComplaintsRow, UploadCustomerComplaintsModal } from "../../components";

function PSPScheduleOfCustomerComplaint() {
  const [customerComplaints, setCustomerComplaints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [data, setData] = useState([]);
  const [reportingDate, setReportingDate] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  function openModal(type) {
    type === "add" ? setIsOpen(true) : setCsvOpen(true);
  }

  useEffect(() => {
    fetchCustomerComplaintsDates();
  }, []);

  const fetchCustomerComplaintsDates = async () => {
    try {
      const setCustomerComplaintsDates = await apiRequest.get(
        "/psp-schedule-of-customer-complaints-&-remedial-actions/unique-reporting-dates"
      );
      setCustomerComplaints(setCustomerComplaintsDates.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  useEffect(() => {
    if (reportingDate) {
      fetchCustomerComplaintsData();
    }
  }, [reportingDate]);

  const fetchCustomerComplaintsData = async () => {
    try {
      const setCustomerComplaintsData = await apiRequest.get(
        `/psp-schedule-of-customer-complaints-&-remedial-actions/${reportingDate}`
        );
        setData(setCustomerComplaintsData.data);
        setTotalPages(Math.ceil(setCustomerComplaintsData.data.length / itemsPerPage));
        setCurrentPage(1); // Reset to first page when data changes
      } catch (error) {
      console.error(error);
    }
  };

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Generate page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxPageButtons) {
      // Show all pages if there are few pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to always show 3 pages in the middle
      if (startPage === 2) endPage = Math.min(totalPages - 1, startPage + 2);
      if (endPage === totalPages - 1) startPage = Math.max(2, endPage - 2);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) pageNumbers.push('...');
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) pageNumbers.push('...');
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="max-w-[1440px] w-full mx-auto py-10 overflow-hidden">
      <div className="flex justify-center flex-col gap-5 w-full">
        <h2 className="text-3xl text-center">
          PSP Schedule of Customer Complaints & Remedial Actions
        </h2>

        <div className="flex-center p-4">
          <p className="text-lg font-semibold italic">Click on a date to display data</p>
        </div>

        <div className="p-4 flex items-center justify-center gap-4 flex-wrap">
          {customerComplaints.map((reportDate) => (
            <button
              key={reportDate.reportingDate}
              onClick={() => {
                const formattedDate = reportDate.reportingDate.split("/").join("-");
                setReportingDate(formattedDate);
              }}
              type="button"
              className={`border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300 ${
                reportingDate === reportDate.reportingDate.split("/").join("-")
                  ? "bg-gray-400 text-white"
                  : ""
              }`}
            >
              {reportDate.reportingDate}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-20">
          <button
            onClick={() => openModal("add")}
            type="button"
            className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Add
          </button>

          <button
            onClick={() => openModal("csv")}
            type="button"
            className="border px-5 py-1 w-fit rounded-md transition-all hover:bg-gray-400 hover:text-white duration-300"
          >
            Bulk Add
          </button>
        </div>

        <div className="overflow-x-auto">
          {data && Array.isArray(data) && data.length > 0 && (
              <table className="border-collapse w-full mb-4">
                <PSPScheduleOfCustomerComplaintsHeader />
                <tbody>
                  {currentItems.map((item) => (
                    <PSPScheduleOfCustomerComplaintsRow
                      key={item.rowId}
                      trustAcc={item}
                      onRecordAdded={fetchCustomerComplaintsData}
                    />
                  ))}
                </tbody>
              </table>
          )}
        </div>

        {/* Pagination controls */}
        {data && Array.isArray(data) && data.length > 0 && 
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <select
                    className="border border-red-500 outline-red-600 rounded px-2 py-1"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setTotalPages(Math.ceil(data.length / Number(e.target.value)));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                  <p className="ml-3 text-sm text-gray-700">
                    Showing <span className="text-red-500 font-semibold">{indexOfFirstItem + 1}</span> to <span className="text-red-500 font-semibold">{Math.min(indexOfLastItem, data.length)}</span> of <span className="text-red-500 font-semibold">{data.length}</span> entries
                  </p>
                </div>

                <div className="flex justify-between">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {/* First page button */}
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">First</span>
                      <span>&laquo;&laquo;</span>
                    </button>
                    
                    {/* Previous page button */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <span>&laquo;</span>
                    </button>
                    
                    {/* Page numbers */}
                    {generatePageNumbers().map((pageNumber, index) => {
                      if (pageNumber === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === pageNumber
                              ? "bg-red-50 border-red-500 text-red-600 z-10"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    {/* Next page button */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <span>&raquo;</span>
                    </button>
                    
                    {/* Last page button */}
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Last</span>
                      <span>&raquo;&raquo;</span>
                    </button>
                  </nav>
                </div>
        </div>
        }
      </div>

      {/* Modal components would be added here */}
      <AddScheduleOfCustomerComplaintsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRecordAdded={fetchCustomerComplaintsData}
      />

      <UploadCustomerComplaintsModal
        isOpen={csvOpen}
        setIsOpen={setCsvOpen}
        onRecordAdded={fetchCustomerComplaintsData}
      />
    </div>
  );
}

export default PSPScheduleOfCustomerComplaint;