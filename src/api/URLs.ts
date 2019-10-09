import { API_BASE_URL } from "../controller/config";

class URLs {
    private static caseManagementSystem: CaseManagementSystem =
        (process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM as CaseManagementSystem) ||
        "DEFAULT";
    private static caseType: CaseType =
        (process.env.REACT_APP_CASE_TYPE as CaseType) || "STANDARD";
        private static resultsPerPage: number = 20;

    private static baseUrl(path?: string): URL {
        return new URL(API_BASE_URL + "/api" + path);
    }

    /* CSRF */
    public static csrf(): URL {
        return URLs.baseUrl("/csrf");
    }

    /* Users */
    public static users(): URL {
        return URLs.baseUrl("/users");
    }

    /* Cases */
    private static casesBase(): URL {
        return URLs.baseUrl(`/cases/${this.caseManagementSystem}/${this.caseType}`);
    }

    public static casesSummary(): URL {
        const url = URLs.casesBase();
        url.pathname += "/summary"
        return url;
    }

    public static cases(snoozeState: SnoozeState, page: number): URL {
        const url = URLs.casesBase();
        url.pathname += "/" + snoozeState
        url.searchParams.append("page", String(page));
        url.searchParams.append("size", String(this.resultsPerPage));
        return url;
    }

    /* Case Details */
    public static caseDetails(receiptNumber: string): URL {
        return URLs.baseUrl(`/caseDetails/${this.caseManagementSystem}/${receiptNumber}`);
    }

    public static caseDetailsActiveSnooze(receiptNumber: string): URL {
        const url = URLs.caseDetails(receiptNumber);
        url.pathname += "/activeSnooze"
        return url;
    }
}

export default URLs;