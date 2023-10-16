// function getMonthName(monthNumber) {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[monthNumber - 1];
// }

export const getDate = (date) => {
  const createdAtDate = new Date(date);

  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1;
  const day = createdAtDate.getDate();

  return `${day},${month},${year}`;
};
