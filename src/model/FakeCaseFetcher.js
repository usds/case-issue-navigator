import fakedata from "../sample_data/i90_old";
import fake_resolved from "../sample_data/i90_resolved";

const ageSort = (a,b)=>(b.caseAge - a.caseAge);

export function fetchResolved() {
    return fake_resolved.sort(ageSort);
}

export function fetchAll() {
    return fakedata.sort(ageSort);
}