
export const MARKET_API_URL =
  process.env.NEXT_PUBLIC_MARKET_API_URL ||
  "http://127.0.0.1:8000";

export const MARKET_SYMBOLS = [
  "XAUUSD",
  "EURUSD",
  "GBPUSD",
] as const;

export const MARKET_TIMEFRAMES = [
  "1m",
  "5m",
  "15m",
  "1h",
  "4h",
  "1d",
] as const;

export type MarketSymbol =
  (typeof MARKET_SYMBOLS)[number];

export type MarketTimeframe =
  (typeof MARKET_TIMEFRAMES)[number];
