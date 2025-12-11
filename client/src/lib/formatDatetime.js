export const formatDateTime = (date) => {
  const datetime = new Date(date);

  const formattedDate = datetime.toLocaleDateString("en-GB");
  const formattedTime = datetime.toLocaleTimeString();

  return `${formattedDate} ${formattedTime}`;
};

export const formatDateTimeISO = (datetime) => {
  if(!datetime) return;

  const date = new Date(datetime)

  const pad = (number, length=2) => String(number).padStart(length, "0")

  const day = pad(date.getDate())
  const month = date.toLocaleDateString("en-US", {month: "short"}).toUpperCase()
  const year = String(date.getFullYear()).slice(-2)
  const hours = date.getHours() % 12 || 12
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  const miliseconds = pad(date.getMilliseconds(), 3) + "000000";
  const period = date.getHours() >= 12 ? "PM" : "AM";

  // return `${day}-${month}-${year} ${hours}.${minutes}.${seconds}.${miliseconds} ${period}`
  return `${day}-${month}-${year} ${hours}.${minutes}.${seconds}.${miliseconds}`
}



export function convertCustomToStandard(dateString) {
  if (!dateString) {
    return;
  }

  // Split the date and time
  const [datePart, timePart, period] = dateString.split(" ");

  // Parse the date part
  const [day, monthStr, year] = datePart.split("-");
  const month =
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ].indexOf(monthStr) + 1;

  // Parse the time part (remove nanoseconds)
  const [hours, minutes, seconds] = timePart.split(".").map(Number);

  // Format components
  const formattedDay = day.padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedYear = `20${year}`; // Expand the 2-digit year
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Assemble the output
  // return `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  return `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

export const formatKESCurrency = (amount) => {
  return new Intl.NumberFormat('en-Ke', {
    style: 'currency',
    currency: 'KES',
  }).format(amount)
}