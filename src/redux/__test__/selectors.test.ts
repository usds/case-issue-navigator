import { RootState } from "../create";
import { hasFilters } from "../selectors";

const baseState: RootState = {
  appStatus: {
    pageTitle: "",
    dataFetching: {
      error: null,
      isLoading: false
    },
    isInitializing: false
  },
  cases: {
    caselist: [],
    isLoading: false,
    summary: {
      CASES_TO_WORK: 0,
      PREVIOUSLY_SNOOZED: 0,
      SNOOZED_CASES: 0
    },
    type: "active"
  }
};

describe("selectors", () => {
  describe("hasFilters", () => {
    it("shouldn't report having filters if it doesn't", () => {
      expect(hasFilters(baseState)).toBe(false);
    });
    it("should indicate having a filter for caseCreationEnd", () => {
      const filteredState: RootState = {
        ...baseState,
        cases: {
          ...baseState.cases,
          caseCreationEnd: new Date()
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for caseCreationStart", () => {
      const filteredState: RootState = {
        ...baseState,
        cases: {
          ...baseState.cases,
          caseCreationStart: new Date()
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for serviceNowFilter", () => {
      const filteredState: RootState = {
        ...baseState,
        cases: {
          ...baseState.cases,
          serviceNowFilter: true
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for SnoozeReasonFilter", () => {
      const filteredState: RootState = {
        ...baseState,
        cases: {
          ...baseState.cases,
          snoozeReasonFilter: "test_data"
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
  });
});
