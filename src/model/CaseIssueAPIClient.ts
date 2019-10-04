import ClientBase from "./ClientBase";

type SnoozeState = "active" | "snoozed";

class CaseIssueAPIClient extends ClientBase {
  public async deleteActiveSnooze(receiptNumber: string) {
    this.setCsrf();
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

  public async getCaseDetails(receiptNumber: string) {
    return await this.getAsJson(
      CaseIssueAPIClient.createApiUrl(
        `/api/caseDetails/${this.caseManagementSystem}/${receiptNumber}`
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
    this.setCsrf();
    return await this.put(
      CaseIssueAPIClient.createApiUrl(
        `/api/caseDetails/${this.caseManagementSystem}/${receiptNumber}/activeSnooze`
      ),
      snoozeInputs
    );
  }
}

export default CaseIssueAPIClient;
