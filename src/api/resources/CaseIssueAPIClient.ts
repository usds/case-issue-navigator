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
    to?: Date,
    snoozeReason?: string
  ): Promise<c.ApiResponse<Case[], APIError>> {
    if (filter !== "SNOOZED" && snoozeReason) {
      console.error(
        `Invalid api call. get ${filter} cases with a snoozeReason filter`
      );
    }
    return (await this.getAsJson(
      URLs.cases(filter, receiptNumber, from, to, snoozeReason)
    )) as any;
  }

  public async getCaseSummary(): Promise<c.ApiResponse<SummarySuccess, {}>> {
    return (await this.getAsJson(URLs.casesSummary())) as any;
  }
}

export default CaseIssueAPIClient;
