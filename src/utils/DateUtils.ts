export const ONE_DAY_IN_MS = 86400000;

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
  static shortFormatDate(dateString: string): string {
    const date = new Date(dateString);

    if (!isNaN(date as any)) {
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    }

    return "Invalid date";
  }

  static badgeFormat(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const year =
      date.getFullYear() === now.getFullYear() ? "" : `, ${date.getFullYear()}`;

    if (!isNaN(date as any)) {
      return `${month[date.getMonth()]} ${date.getDate()}${year}`;
    }

    return "Invalid date";
  }
}
