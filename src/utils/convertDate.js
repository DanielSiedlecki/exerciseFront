function convertDateToTimestamp(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date provided");
  }

  return Math.floor(date.getTime() / 1000);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export { convertDateToTimestamp, formatDate };
