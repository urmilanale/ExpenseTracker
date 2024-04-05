import { MONTHS } from "./constants";

export function getCurrentFormattedDate(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMonthNameByDate(_date) {
  const date = new Date(_date);
  const monthIndex = date.getMonth();
  return MONTHS[monthIndex];
}
export function downloadCSV(data) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    Object.keys(data[0])
      .map((key) => key)
      .join(",") +
    "\n" +
    data.map((obj) => Object.values(obj).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
}
