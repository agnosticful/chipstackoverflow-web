import {
  getRelativeDateString,
  getRelativeShortDateString
} from "./getRelativeDateString";

describe("getRelativeDateString()", () => {
  const OriginalDate = Date;

  beforeEach(() => {
    global.Date = class extends Date {
      constructor() {
        super(2020, 8, 15, 12, 10, 1);
      }
    } as any;
  });

  afterEach(() => {
    global.Date = OriginalDate;
  });

  it("returns 1 year", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    expect(getRelativeDateString(now)).toEqual("1 year");
  });

  it("returns 2 years", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 2);
    expect(getRelativeDateString(now)).toEqual("2 years");
  });

  it("returns 1 month", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    expect(getRelativeDateString(now)).toEqual("1 month");
  });

  it("returns 2 months", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 2);
    expect(getRelativeDateString(now)).toEqual("2 months");
  });

  it("returns 1 week", () => {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    expect(getRelativeDateString(now)).toEqual("1 week");
  });

  it("returns 2 weeks", () => {
    const now = new Date();
    now.setDate(now.getDate() - 14);
    expect(getRelativeDateString(now)).toEqual("2 weeks");
  });

  it("returns 1 day", () => {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    expect(getRelativeDateString(now)).toEqual("1 day");
  });

  it("returns 2 days", () => {
    const now = new Date();
    now.setDate(now.getDate() - 2);
    expect(getRelativeDateString(now)).toEqual("2 days");
  });

  it("returns 1 hour", () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    expect(getRelativeDateString(now)).toEqual("1 hour");
  });

  it("returns 2 hours", () => {
    const now = new Date();
    now.setHours(now.getHours() - 2);
    expect(getRelativeDateString(now)).toEqual("2 hours");
  });

  it("returns 1 minute", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    expect(getRelativeDateString(now)).toEqual("1 minute");
  });

  it("returns 2 minutes", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 2);
    expect(getRelativeDateString(now)).toEqual("2 minutes");
  });

  it("returns 1 second", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 1);
    expect(getRelativeDateString(now)).toEqual("1 second");
  });

  it("returns 2 seconds", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 2);
    expect(getRelativeDateString(now)).toEqual("2 seconds");
  });
});

describe("getRelativeShortDateString()", () => {
  it("returns 1 y", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 y");
  });

  it("returns 2 y", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 y");
  });

  it("returns 1 m", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 m");
  });

  it("returns 2 m", () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 m");
  });

  it("returns 1 w", () => {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    expect(getRelativeShortDateString(now)).toEqual("1 w");
  });

  it("returns 2 w", () => {
    const now = new Date();
    now.setDate(now.getDate() - 14);
    expect(getRelativeShortDateString(now)).toEqual("2 w");
  });

  it("returns 1 d", () => {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 d");
  });

  it("returns 2 d", () => {
    const now = new Date();
    now.setDate(now.getDate() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 d");
  });

  it("returns 1 h", () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 h");
  });

  it("returns 2 h", () => {
    const now = new Date();
    now.setHours(now.getHours() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 h");
  });

  it("returns 1 min", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 min");
  });

  it("returns 2 mins", () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 mins");
  });

  it("returns 1 sec", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 1);
    expect(getRelativeShortDateString(now)).toEqual("1 sec");
  });

  it("returns 2 secs", () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - 2);
    expect(getRelativeShortDateString(now)).toEqual("2 secs");
  });
});
