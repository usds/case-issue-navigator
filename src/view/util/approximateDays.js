export const approximateDays = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / 86400000);
};
