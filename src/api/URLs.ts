import { API_BASE_URL } from "../controller/config";

export const RESULTS_PER_PAGE: number = 20;

class URLs {
  private static caseManagementSystem: CaseManagementSystem =
    (process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM as CaseManagementSystem) ||
    "DEFAULT";
  private static caseType: CaseType =
    (process.env.REACT_APP_CASE_TYPE as CaseType) || "STANDARD";
  // Add 1 to resultsPerPage to see if there are more results
  private static resultsPerPage: number = RESULTS_PER_PAGE + 1;

  private static baseUrl(path: string): URL {
    return new URL(API_BASE_URL + path);
  }

  private static APIBaseUrl(path: string): URL {
    return URLs.baseUrl("/api" + path);
  }

  /* CSRF */
  public static csrf(): URL {
    return URLs.baseUrl("/csrf");
  }

  /* Users */
  public static users(): URL {
    return URLs.APIBaseUrl("/users");
  }

  /* Cases */
  private static casesBase(): URL {
    return URLs.APIBaseUrl(
      `/cases/${this.caseManagementSystem}/${this.caseType}`
    );
  }

  public static casesSummary(): URL {
    const url = URLs.casesBase();
    url.pathname += "/summary";
    return url;
  }

  public static cases(
    filter: SnoozeState,
    receiptNumber?: string,
    from?: Date,
    to?: Date,
    snoozeReason?: string,
    caseStatus?: CaseStatusOptions,
    caseSubstatus?: CaseSubstatusOptions
  ): URL {
    const url = URLs.casesBase();
    url.searchParams.append("mainFilter", filter);
    url.searchParams.append("size", String(this.resultsPerPage));

    if (receiptNumber) {
      url.searchParams.append("pageReference", receiptNumber);
    }
    if (from) {
      url.searchParams.append("caseCreationRangeBegin", from.toISOString());
    }
    if (to) {
      url.searchParams.append("caseCreationRangeEnd", to.toISOString());
    }
    if (snoozeReason) {
      url.searchParams.append("snoozeReason", snoozeReason);
    }
    if (caseStatus) {
      url.searchParams.append("filter_dataField[caseStatus]", caseStatus);
    }
    if (caseSubstatus) {
      url.searchParams.append("filter_dataField[caseSubstatus]", caseSubstatus);
    }
    return url;
  }

  public static casesSearch(query: string): URL {
    const url = URLs.casesBase();
    url.pathname += "/search";
    url.searchParams.append("query", query);
    return url;
  }

  /* Case Details */
  public static caseDetails(receiptNumber: string): URL {
    return URLs.APIBaseUrl(
      `/caseDetails/${this.caseManagementSystem}/${receiptNumber}`
    );
  }

  public static caseDetailsActiveSnooze(receiptNumber: string): URL {
    const url = URLs.caseDetails(receiptNumber);
    url.pathname += "/activeSnooze";
    return url;
  }
}

export default URLs;
