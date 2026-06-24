export const USDT_SCALE = 10n;

/** Parse a USDT amount with at most one decimal place into integer tenths. */
export function parseUsdtToUnits(amount: string | number | bigint): bigint {
  if (typeof amount === "bigint") return amount * USDT_SCALE;

  const text = String(amount).trim();
  const match = /^(\d+)(?:\.(\d))?$/.exec(text);
  if (!match) {
    throw new Error(`Invalid USDT amount: ${amount}. Use at most one decimal place`);
  }

  return BigInt(match[1]) * USDT_SCALE + BigInt(match[2] ?? "0");
}

/** Format integer tenths as a canonical USDT string with at most one decimal place. */
export function formatUsdtUnits(units: bigint): string {
  const sign = units < 0n ? "-" : "";
  const absolute = units < 0n ? -units : units;
  const whole = absolute / USDT_SCALE;
  const decimal = absolute % USDT_SCALE;
  return decimal === 0n
    ? `${sign}${whole}`
    : `${sign}${whole}.${decimal}`;
}

export function normalizeUsdt(amount: string | number | bigint): string {
  return formatUsdtUnits(parseUsdtToUnits(amount));
}
