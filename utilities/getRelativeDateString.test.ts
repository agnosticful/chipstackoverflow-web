import getRelativeDateString from "./getRelativeDateString";

describe("getRelativeDateString()", () => {
  it("returns 1 year", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "y", "year"]);
  });

  it("returns 2 years", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "y", "years"]);
  });

  it("returns 1 month", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "m", "month"]);
  });

  it("returns 2 months", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "m", "months"]);
  });

  it("returns 1 week", () => {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    expect(getRelativeDateString(now)).toEqual([1, "w", "week"]);
  });

  it("returns 2 weeks", () => {
    const now = new Date();
    now.setDate(now.getDate() - 14);
    expect(getRelativeDateString(now)).toEqual([2, "w", "weeks"]);
  });

  it("returns 1 day", () => {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "d", "day"]);
  });

  it("returns 2 days", () => {
    const now = new Date();
    now.setDate(now.getDate() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "d", "days"]);
  });

  it("returns 1 hour", () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "h", "hour"]);
  });

  it("returns 2 hours", () => {
    const now = new Date();
    now.setHours(now.getHours() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "h", "hours"]);
  });

  it("returns 1 minute", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "m", "minute"]);
  });

  it("returns 2 minutes", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "m", "minutes"]);
  });

  it("returns 1 second", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 1);
    expect(getRelativeDateString(now)).toEqual([1, "s", "second"]);
  });

  it("returns 2 seconds", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 2);
    expect(getRelativeDateString(now)).toEqual([2, "s", "seconds"]);
  });
});
