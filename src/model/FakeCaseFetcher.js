import fakedata from "../sample_data/i90_old";

const ageSort = (a, b) => b.caseAge - a.caseAge;

export function fetchAll() {
  return fakedata.sort(ageSort);
}
