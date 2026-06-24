import {
  formatUsdtUnits,
  normalizeUsdt,
  parseUsdtToUnits,
} from "./usdt";
import { matchPoolRandomize } from "./matchPoolRandomize";

describe("USDT decimal helpers", () => {
  test.each([
    ["0", 0n],
    ["1", 10n],
    ["1.1", 11n],
    ["1.9", 19n],
    ["15.0", 150n],
  ])("parses %s into tenths", (amount, expected) => {
    expect(parseUsdtToUnits(amount)).toBe(expected);
  });

  test.each(["1.11", "1.25", "abc", "-1", ""])(
    "rejects invalid precision: %s",
    (amount) => {
      expect(() => parseUsdtToUnits(amount)).toThrow(/Invalid USDT amount/);
    },
  );

  test("formats values with no more than one decimal place", () => {
    expect(formatUsdtUnits(5n)).toBe("0.5");
    expect(formatUsdtUnits(11n)).toBe("1.1");
    expect(formatUsdtUnits(150n)).toBe("15");
    expect(normalizeUsdt("15.0")).toBe("15");
  });

  test("distributes the new 28 USDT pot exactly in decimal units", () => {
    const cells = matchPoolRandomize(280n, 12);
    expect(cells).toHaveLength(12);
    expect(cells.reduce((sum, value) => sum + value, 0n)).toBe(280n);
    expect(cells.every((value) => value >= 1n && value <= 70n)).toBe(true);
    expect(
      cells.map(formatUsdtUnits).every((value) => /^\d+(?:\.\d)?$/.test(value)),
    ).toBe(true);
  });

  test("splits the two 1 USDT fees between project and referrers", () => {
    const totalFees = parseUsdtToUnits("2");
    const referralReward = parseUsdtToUnits("1") / 2n;

    expect(formatUsdtUnits(referralReward)).toBe("0.5");
    expect(formatUsdtUnits(totalFees - referralReward)).toBe("1.5");
    expect(formatUsdtUnits(totalFees - referralReward * 2n)).toBe("1");
  });
});
