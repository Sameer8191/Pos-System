
import { describe, it, expect } from "vitest";
import {
  getFinancialYear,
  getFinancialYearEnd,
  getFinancialYearStart,
} from "../../server/lib/date";

describe("financial year utilities", () => {
  it("uses April 1 as the financial year boundary", () => {
    expect(getFinancialYear(new Date(2025, 2, 31))).toBe("2024-25");
    expect(getFinancialYear(new Date(2025, 3, 1))).toBe("2025-26");
  });

  it("returns the start of the financial year containing the date", () => {
    const start = getFinancialYearStart(new Date(2025, 1, 15));

    expect(start.getFullYear()).toBe(2024);
    expect(start.getMonth()).toBe(3);
    expect(start.getDate()).toBe(1);
  });

  it("returns the end of the financial year containing the date", () => {
    const end = getFinancialYearEnd(new Date(2024, 3, 1));

    expect(end.getFullYear()).toBe(2025);
    expect(end.getMonth()).toBe(2);
    expect(end.getDate()).toBe(31);
  });
});
