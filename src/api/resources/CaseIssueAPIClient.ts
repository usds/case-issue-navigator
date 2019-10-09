import ClientBase from "./ClientBase";


class CaseIssueAPIClient extends ClientBase {
  public async getActive(page: number) {
    return await this.getAsJson(URLs.cases("active", page));
  }

  public async getSnoozed(page: number) {
    return await this.getAsJson(URLs.cases("snoozed", page));
  }

  public async getCaseSummary() {
    return await this.getAsJson(URLs.casesSummary());
  }
}

export default CaseIssueAPIClient;
