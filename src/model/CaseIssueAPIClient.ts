import ClientBase from "./ClientBase";
import { SnoozeOption } from "../types";

type SnoozeState = "active" | "snoozed";

class CaseIssueAPIClient extends ClientBase {
  public async deleteActiveSnooze(receiptNumber: string) {
    return await this.delete(
      CaseIssueAPIClient.createApiUrl(
        `/api/caseDetails/${this.caseManagementSystem}/${receiptNumber}/activeSnooze`
      )
    );
  }

  public async getActive(page: number) {
    return await this.getCases("active", page);
  }

  private async getCases(snoozeState: SnoozeState, page: number) {
    return await this.getAsJson(
      CaseIssueAPIClient.createApiUrl(
        `/api/cases/${this.caseManagementSystem}/${this.caseType}/${snoozeState}?page=${page}&size=${this.resultsPerPage}`
      )
    );
  }

  public async getCaseSummary() {
    return await this.getAsJson(
      CaseIssueAPIClient.createApiUrl(
        `/api/cases/${this.caseManagementSystem}/${this.caseType}/summary`
      )
    );
  }

  public async getSnoozed(page: number) {
    return await this.getCases("snoozed", page);
  }

  public async updateActiveSnooze(
    receiptNumber: string,
    snoozeInputs: SnoozeOption
  ) {
    return await this.put(
      CaseIssueAPIClient.createApiUrl(
        `/api/caseDetails/${this.caseManagementSystem}/${receiptNumber}/activeSnooze`
      ),
      snoozeInputs
    );
  }
}

export default CaseIssueAPIClient;
