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
  public async getActive(page: number) {
    return await this.getAsJson(URLs.cases("active", page));
  }

  public async getSnoozed(page: number) {
    return await this.getAsJson(URLs.cases("snoozed", page));
  }

  public async getCaseSummary(): Promise<c.ApiResponse<SummarySuccess, {}>> {
    return await this.getAsJson(URLs.casesSummary()) as any;
  }
}

export default CaseIssueAPIClient;
