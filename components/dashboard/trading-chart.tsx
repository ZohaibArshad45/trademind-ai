
"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

import {
  MARKET_TIMEFRAMES,
  type MarketTimeframe,
} from "@/lib/constants/market";

import {
  getMarketCandles,
  type Candle,
} from "@/lib/utils/market-api";

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [timeframe, setTimeframe] =
    useState<MarketTimeframe>("15m");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);

  // Fetch actual MT5 candles
  useEffect(() => {
    let cancelled = false;

    async function loadCandles() {
      setLoading(true);
      setError(null);

      try {
        const data = await getMarketCandles(
          "XAUUSD",
          timeframe,
          200
        );

        if (!cancelled) {
          setCandles(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load market data"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCandles();

    return () => {
      cancelled = true;
    };
  }, [timeframe]);

  // Render chart
  useEffect(() => {
    if (!chartContainerRef.current || candles.length === 0) {
      return;
    }

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 380,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#111114",
        },
        textColor: "#a1a1aa",
        attributionLogo: false,
      },

      grid: {
        vertLines: { color: "#25252b" },
        horzLines: { color: "#25252b" },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },

      rightPriceScale: {
        borderColor: "#27272a",
      },

      timeScale: {
        borderColor: "#27272a",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const chartData: CandlestickData<Time>[] =
      candles.map((candle) => ({
        time: candle.time as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }));

    series.setData(chartData);
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;

      if (width) {
        chart.applyOptions({ width });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#111114] p-4 md:p-6">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">XAUUSD</h2>

            <span className="rounded-md bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
              GOLD
            </span>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            Gold / US Dollar · MetaTrader 5
          </p>
        </div>

        <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
          MT5 HISTORICAL DATA
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {MARKET_TIMEFRAMES.map((item) => (
          <button
            key={item}
            onClick={() => setTimeframe(item)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
              timeframe === item
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex h-[380px] items-center justify-center text-sm text-zinc-400">
          Loading MT5 market data...
        </div>
      )}

      {error && (
        <div className="flex h-[380px] items-center justify-center text-sm text-red-400">
          {error}
        </div>
      )}

      <div
        ref={chartContainerRef}
        className={`w-full ${loading || error ? "hidden" : ""}`}
      />

      <p className="mt-4 text-xs text-zinc-500">
        Historical candles from your connected MT5 broker.
        Prices may be delayed when the market is closed.
      </p>
    </section>
  );
}
