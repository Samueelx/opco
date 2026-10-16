export const parseAmount = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/,/g,''))
    }
    return parseFloat(value) || 0;
  }

  export function formatDateToIncidentDateFormat(reportingDate){
    if (!reportingDate) {
      return;
    }
    const [yearPart, monthPart, dayPart] = reportingDate.split("-")
    const month =
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][Number(monthPart) - 1];
  
      const formattedDate = `${dayPart}-${month}-${yearPart}`
      return formattedDate
  }