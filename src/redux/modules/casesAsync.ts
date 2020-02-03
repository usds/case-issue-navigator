import { RootState } from "../create";
import { AnyAction } from "redux";
import RestAPIClient from "../../api/RestAPIClient";
import { casesActionCreators } from "./cases";
import { ThunkDispatch } from "redux-thunk";
import NoteUtils from "../../utils/NoteUtils";
import { RESULTS_PER_PAGE } from "../../api/URLs";

const serviceNowCaseFilter = (c: Case) => {
  if (
    ["test_data", "technical_issue"].includes(
      (c.snoozeInformation as SnoozeInformation).snoozeReason
    )
  ) {
    if (NoteUtils.getFollowUp(c.notes, "troubleticket")) {
      return true;
    }
  }
  return false;
};

export const loadCases = (reciptnumber?: string) => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  const {
    setIsLoading,
    addCases,
    setHasMoreCases,
    setTotalCaseCount,
    setQueryCaseCount
  } = casesActionCreators;
  const { cases, caseFilters } = getState();
  const { caselist } = cases;
  const {
    caseCreationEnd,
    caseCreationStart,
    snoozeReasonFilter,
    serviceNowFilter,
    snoozeState,
    caseStatus,
    caseSubstatus
  } = caseFilters;

  const lastReceiptNumber =
    caselist.length > 0
      ? caselist[caselist.length - 1].receiptNumber
      : undefined;

  dispatch(setIsLoading(true));
  const response = await RestAPIClient.cases.getCases(
    snoozeState,
    reciptnumber ? reciptnumber : lastReceiptNumber,
    caseCreationStart,
    caseCreationEnd,
    snoozeReasonFilter,
    caseStatus,
    caseSubstatus
  );
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    dispatch(setTotalCaseCount(response.payload.totalCount));
    dispatch(setQueryCaseCount(response.payload.queryCount));
    const cases = response.payload.cases;
    if (cases.length > RESULTS_PER_PAGE) {
      cases.pop();
      dispatch(setHasMoreCases(true));
    } else {
      dispatch(setHasMoreCases(false));
    }
    if (serviceNowFilter !== undefined) {
      const sNCases = serviceNowFilter
        ? response.payload.cases.filter((c: Case) => {
            return serviceNowCaseFilter(c);
          })
        : response.payload.cases.filter((c: Case) => {
            return !serviceNowCaseFilter(c);
          });
      if (sNCases.length === 0 && cases.length > 0) {
        const r = cases[cases.length - 1].receiptNumber;
        dispatch(loadCases(r));
      }
      dispatch(addCases(sNCases));
    } else {
      dispatch(addCases(cases));
    }

    return;
  }

  if (response.responseReceived) {
    const errorJson = await response.responseError.getJson();
    console.error(errorJson);
  } else {
    console.error(response);
  }
};

export const loadSearchResults = () => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  const { setIsLoading, addCases, clearCases } = casesActionCreators;
  const { caseFilters } = getState();
  const { search } = caseFilters;
  dispatch(setIsLoading(true));
  if (!search) {
    console.error("search called with our a query");
    return;
  }
  const response = await RestAPIClient.cases.getSearch(search);
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    dispatch(clearCases());
    dispatch(addCases(response.payload));
    return;
  }

  if (response.responseReceived) {
    const errorJson = await response.responseError.getJson();
    console.error(errorJson);
  } else {
    console.error(response);
  }
};
