import ClientBase from "./ClientBase";

type SnoozeState = "active" | "snoozed";

class CaseIssueAPIClient extends ClientBase {
  private async getCases(snoozeState: SnoozeState, page: number) {
    return await this.getAsJson(
      CaseIssueAPIClient.createApiUrl(
        `/api/cases/${this.caseManagementSystem}/${this.caseType}/${snoozeState}?page=${page}&size=${this.resultsPerPage}`
      )
    );
  }

  public async getActive(page: number) {
    return await this.getCases("active", page);
  }

  public async getSnoozed(page: number) {
    return await this.getCases("snoozed", page);
  }
}

export default CaseIssueAPIClient;
