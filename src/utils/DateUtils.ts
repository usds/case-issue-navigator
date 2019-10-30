const ONE_DAY_IN_MS = 86400000;

export default class DateUtils {
  static numberOfDaysUntil(date: string): number {
    return Math.ceil(
      (new Date(date).valueOf() - new Date().valueOf()) / ONE_DAY_IN_MS
    );
  }
  static numberOfDaysSince(date: string): number {
    return Math.ceil(
      (new Date().valueOf() - new Date(date).valueOf()) / ONE_DAY_IN_MS
    );
  }
}
