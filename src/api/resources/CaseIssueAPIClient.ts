import { FetchClient as c } from "tbest-fetch-client";
import ClientBase from "../ClientBase";
import URLs from "../URLs";

interface SummarySuccess {
  lastUpdated: string | null;
}

interface CaseList {
  totalCount: number;
  queryCount: number;
  cases: Case[];
}

class CaseIssueAPIClient extends ClientBase {
  public async getCases(
    filter: SnoozeState,
    receiptNumber?: string,
    from?: Date,
    to?: Date,
    snoozeReason?: string,
    caseStatus?: CaseStatusOptions,
    caseSubstatus?: CaseSubstatusOptions
  ): Promise<c.ApiResponse<CaseList, APIError>> {
    return (await this.getAsJson(
      URLs.cases(
        filter,
        receiptNumber,
        from,
        to,
        snoozeReason,
        caseStatus,
        caseSubstatus
      )
    )) as any;
  }

  public async getSearch(
    query: string
  ): Promise<c.ApiResponse<Case[], APIError>> {
    return (await this.getAsJson(URLs.casesSearch(query.trim()))) as any;
  }

  public async getCaseSummary(): Promise<c.ApiResponse<SummarySuccess, {}>> {
    return (await this.getAsJson(URLs.casesSummary())) as any;
  }
}

export default CaseIssueAPIClient;
