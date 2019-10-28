export const getHeaders = (
  allHeaders: I90Header[],
  view: string
): I90Header[] => {
  return allHeaders.filter(header => header.views.includes(view));
};
