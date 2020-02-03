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
    hasMoreCases: false
  },
  caseFilters: {
    snoozeState: "ALL",
    activeSearch: false
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
        caseFilters: {
          ...baseState.caseFilters,
          caseCreationEnd: new Date()
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for caseCreationStart", () => {
      const filteredState: RootState = {
        ...baseState,
        caseFilters: {
          ...baseState.caseFilters,
          caseCreationStart: new Date()
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for serviceNowFilter", () => {
      const filteredState: RootState = {
        ...baseState,
        caseFilters: {
          ...baseState.caseFilters,
          serviceNowFilter: true
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter for ProblemFilter", () => {
      const filteredState: RootState = {
        ...baseState,
        caseFilters: {
          ...baseState.caseFilters,
          snoozeReasonFilter: "test_data"
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter when there is an active search", () => {
      const filteredState: RootState = {
        ...baseState,
        caseFilters: {
          ...baseState.caseFilters,
          activeSearch: true
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
    it("should indicate having a filter when snoozeState is not all", () => {
      const filteredState: RootState = {
        ...baseState,
        caseFilters: {
          ...baseState.caseFilters,
          snoozeState: "TRIAGED"
        }
      };
      expect(hasFilters(filteredState)).toBe(true);
    });
  });
});
