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
  public async getActive(
    receiptNumber?: string
  ): Promise<c.ApiResponse<Case[], APIError>> {
    return (await this.getAsJson(URLs.cases("active", receiptNumber))) as any;
  }

  public async getSnoozed(
    receiptNumber?: string
  ): Promise<c.ApiResponse<Case[], APIError>> {
    return (await this.getAsJson(URLs.cases("snoozed", receiptNumber))) as any;
  }

  public async getCaseSummary(): Promise<c.ApiResponse<SummarySuccess, {}>> {
    return (await this.getAsJson(URLs.casesSummary())) as any;
  }
}

export default CaseIssueAPIClient;
