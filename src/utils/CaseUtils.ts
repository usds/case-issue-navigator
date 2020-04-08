import { SNOOZE_OPTIONS } from "../controller/config";

export default class CaseUtils {
  static isOverDue(c: Case): boolean {
    if (!c.snoozeInformation) {
      return false;
    }
    return Date.parse(c.snoozeInformation.snoozeEnd) < new Date().getTime();
  }

  static isResolved(c: Case): boolean {
    if (!c.snoozeInformation) {
      return false;
    }
    return c.snoozeInformation.snoozeResolved !== null;
  }

  static getDueDate(c: Case): string | undefined {
    if (!c.snoozeInformation) {
      return undefined;
    }
    return c.snoozeInformation.snoozeEnd;
  }

  static getTriagedOn(c: Case): string | undefined {
    if (!c.snoozeInformation) {
      return undefined;
    }
    return c.snoozeInformation.snoozeStart;
  }

  static getProblem(c: Case): CaseProblem | undefined {
    if (!c.snoozeInformation) {
      return undefined;
    }
    return c.snoozeInformation.snoozeReason;
  }

  static getProblemShortText(c: Case): string | undefined {
    if (!c.snoozeInformation) {
      return undefined;
    }
    const option = SNOOZE_OPTIONS[c.snoozeInformation.snoozeReason];
    if (!option) {
      console.error("Problem exists in DB but not in options");
      return undefined;
    }
    return option.shortText;
  }
}
