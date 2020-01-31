import { FetchClient as c } from "tbest-fetch-client";
import ClientBase from "../ClientBase";
import URLs from "../URLs";

interface SnoozeInputs {
  duration: number;
  reason: CaseProblem;
  notes: PartialNote[];
}

interface UpdateSnoozeSuccess {
  notes: Note[];
  snoozeEnd: string;
  snoozeReason: CaseProblem;
  snoozeStart: string;
}

interface CaseDetails {
  notes: Note[];
  snoozes: SnoozeInformation[];
}

class CaseDetailsAPIClient extends ClientBase {
  public async deleteActiveSnooze(
    receiptNumber: string
  ): Promise<c.ApiResponse<{}, APIError>> {
    this.setCsrf();
    return (await this.delete(
      URLs.caseDetailsActiveSnooze(receiptNumber)
    )) as any;
  }

  public async getCaseDetails(
    receiptNumber: string
  ): Promise<c.ApiResponse<CaseDetails, APIError>> {
    return (await this.getAsJson(URLs.caseDetails(receiptNumber))) as any;
  }

  public async updateActiveSnooze(
    receiptNumber: string,
    snoozeInputs: SnoozeInputs
  ): Promise<c.ApiResponse<UpdateSnoozeSuccess, APIError>> {
    this.setCsrf();
    return (await this.put(
      URLs.caseDetailsActiveSnooze(receiptNumber),
      snoozeInputs
    )) as any;
  }
}

export default CaseDetailsAPIClient;
