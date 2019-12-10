import { RootState } from "./create";

export const hasFilters = (state: RootState): boolean => {
  if (
    state.cases.caseCreationStart !== undefined ||
    state.cases.caseCreationEnd !== undefined ||
    state.cases.snoozeReasonFilter !== undefined ||
    state.cases.serviceNowFilter !== undefined
  ) {
    return true;
  }
  return false;
};
