import DateUtils from "../DateUtils";

describe("DateUtils", () => {
  it("Tomorrow should have a duration of 1", () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    expect(DateUtils.numberOfDaysUntil(date.toISOString())).toBe(1);
  });

  it("Yesterday should have a duration of 1", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(DateUtils.numberOfDaysSince(date.toISOString())).toBe(1);
  });
});
