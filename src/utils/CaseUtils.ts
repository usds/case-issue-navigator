export default class CaseUtils {
  static isOverDue(c: Case): boolean {
    if (!c.snoozeInformation) {
      return false;
    }
    return Date.parse(c.snoozeInformation.snoozeEnd) < new Date().getTime();
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
}
