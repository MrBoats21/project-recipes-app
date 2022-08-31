export default function getCurrentDate(separator = '') {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const twoDigits = 10;
  return `${date}${separator}
  ${month < twoDigits ? `0${month}` : `${month}`}${separator}${year}`;
}
