export const getHeaders = (
  allHeaders: Header[],
  view: ViewTitles
): Header[] => {
  return allHeaders.filter(header => header.views.includes(view));
};
