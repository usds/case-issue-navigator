export const getHeaders = (allHeaders, view) => {
  return allHeaders.filter(header => header.views.includes(view));
};
