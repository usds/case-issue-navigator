import { FetchClient as c } from "tbest-fetch-client";
import ClientBase from "../ClientBase";
import URLs from "../URLs";

interface SummarySuccess {
  CURRENTLY_SNOOZED: number;
  NEVER_SNOOZED: number;
  PREVIOUSLY_SNOOZED: number;
  lastUpdated: string | null;
}

class CaseIssueAPIClient extends ClientBase {
  public async getCases(
    filter: CaseSnoozeFilter,
    receiptNumber?: string,
    from?: Date,
    to?: Date
  ): Promise<c.ApiResponse<Case[], APIError>> {
    return (await this.getAsJson(
      URLs.cases(filter, receiptNumber, from, to)
    )) as any;
  }

  public async getCaseSummary(): Promise<c.ApiResponse<SummarySuccess, {}>> {
    return (await this.getAsJson(URLs.casesSummary())) as any;
  }
}

export default CaseIssueAPIClient;
