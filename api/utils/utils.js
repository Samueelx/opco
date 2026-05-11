export const parseAmount = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/,/g,''))
    }
    return parseFloat(value) || 0;
  }

  export function formatDateToCBKFormat(dateStr) {
  if (!dateStr) return dateStr;
  const MONTHS = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC",
  ];
  const [yearPart, monthPart, dayPart] = dateStr.split("-");
  if (!yearPart || !monthPart || !dayPart) return dateStr;
  const month = MONTHS[Number(monthPart) - 1];
  const twoDigitYear = yearPart.slice(-2);
  return `${dayPart}-${month}-${twoDigitYear}`;
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