import { FetchClient as c } from "tbest-fetch-client";
import ClientBase from "../ClientBase";
import URLs from "../URLs";


interface SnoozeInputs {
  duration: number,
  reason: SnoozeReason,
  notes: Note[]
}

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
    snoozeInputs: SnoozeInputs
  ): Promise<c.ApiResponse<SnoozeInformation, APIError>> {
    this.setCsrf();
    return await this.put(
      URLs.caseDetailsActiveSnooze(receiptNumber),
      snoozeInputs
    )as any;
  }
}

export default CaseDetailsAPIClient;
