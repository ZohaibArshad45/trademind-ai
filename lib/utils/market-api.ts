
import { MARKET_API_URL } from "@/lib/constants/market";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandleResponse {
  symbol: string;
  timeframe: string;
  count: number;
  data: Candle[];
}

export async function getMarketCandles(
  symbol: string,
  timeframe: string,
  count = 200
): Promise<Candle[]> {
  const params = new URLSearchParams({
    timeframe,
    count: String(count),
  });

  const response = await fetch(
    `${MARKET_API_URL}/market/candles/${symbol}?${params}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(
      `Market API error: ${response.status}`
    );
  }

  const result: CandleResponse = await response.json();

  return result.data;
}
