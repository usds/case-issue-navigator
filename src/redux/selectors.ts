import { RootState } from "./create";

export const hasFilters = (state: RootState): boolean => {
  if (
    state.caseFilters.caseCreationStart !== undefined ||
    state.caseFilters.caseCreationEnd !== undefined ||
    state.caseFilters.snoozeReasonFilter !== undefined ||
    state.caseFilters.serviceNowFilter !== undefined ||
    state.caseFilters.activeSearch ||
    state.caseFilters.snoozeState !== "ACTIVE"
  ) {
    return true;
  }
  return false;
};
