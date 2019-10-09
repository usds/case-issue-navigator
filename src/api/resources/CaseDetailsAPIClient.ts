import ClientBase from "../ClientBase";
import URLs from "../URLs";

class CaseDetailsAPIClient extends ClientBase {

  public async deleteActiveSnooze(receiptNumber: string) {
    this.setCsrf();
    return await this.delete(URLs.caseDetailsActiveSnooze(receiptNumber));
  }

  public async getCaseDetails(receiptNumber: string) {
    return await this.getAsJson(URLs.caseDetails(receiptNumber));
  }

  public async updateActiveSnooze(
    receiptNumber: string,
    snoozeInputs: SnoozeOption
  ) {
    this.setCsrf();
    return await this.put(
      URLs.caseDetailsActiveSnooze(receiptNumber),
      snoozeInputs
    );
  }
}

export default CaseDetailsAPIClient;
