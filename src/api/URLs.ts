import { API_BASE_URL } from "../controller/config";

class URLs {
  private static caseManagementSystem: CaseManagementSystem =
    (process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM as CaseManagementSystem) ||
    "DEFAULT";
  private static caseType: CaseType =
    (process.env.REACT_APP_CASE_TYPE as CaseType) || "STANDARD";
  private static resultsPerPage: number = 20;

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
    filter: CaseSnoozeFilter,
    receiptNumber?: string,
    from?: Date,
    to?: Date
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
