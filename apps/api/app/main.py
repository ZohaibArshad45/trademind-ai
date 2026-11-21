
from contextlib import asynccontextmanager
from datetime import datetime, timezone

import MetaTrader5 as mt5
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware


SYMBOLS = ["XAUUSD", "EURUSD", "GBPUSD"]

TIMEFRAMES = {
    "1m": mt5.TIMEFRAME_M1,
    "5m": mt5.TIMEFRAME_M5,
    "15m": mt5.TIMEFRAME_M15,
    "1h": mt5.TIMEFRAME_H1,
    "4h": mt5.TIMEFRAME_H4,
    "1d": mt5.TIMEFRAME_D1,
}


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not mt5.initialize():
        raise RuntimeError(
            f"MT5 initialization failed: {mt5.last_error()}"
        )

    print("TradeMind AI: MT5 connected")

    try:
        yield
    finally:
        mt5.shutdown()
        print("TradeMind AI: MT5 disconnected")


app = FastAPI(
    title="TradeMind AI Market Data API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


def get_symbol(symbol: str):
    symbol = symbol.upper()

    if symbol not in SYMBOLS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported symbol. Allowed: {SYMBOLS}",
        )

    info = mt5.symbol_info(symbol)

    if info is None:
        raise HTTPException(
            status_code=404,
            detail=f"Symbol not found: {symbol}",
        )

    if not info.visible:
        if not mt5.symbol_select(symbol, True):
            raise HTTPException(
                status_code=503,
                detail=f"Could not enable symbol: {symbol}",
            )

    return symbol


def serialize_tick(symbol: str):
    tick = mt5.symbol_info_tick(symbol)

    if tick is None or tick.time <= 0:
        return {
            "symbol": symbol,
            "available": False,
            "message": "No market tick available",
            "bid": None,
            "ask": None,
            "spread": None,
            "time": None,
        }

    return {
        "symbol": symbol,
        "available": True,
        "bid": float(tick.bid),
        "ask": float(tick.ask),
        "last": float(tick.last),
        "spread": round(tick.ask - tick.bid, 8),
        "volume": int(tick.volume),
        "time": datetime.fromtimestamp(
            tick.time,
            tz=timezone.utc,
        ).isoformat(),
    }


@app.get("/health")
def health():
    terminal = mt5.terminal_info()
    account = mt5.account_info()

    return {
        "status": "connected" if terminal and account else "disconnected",
        "terminal_connected": terminal is not None,
        "account_connected": account is not None,
        "server": account.server if account else None,
    }


@app.get("/market/symbols")
def get_symbols():
    results = []

    for symbol in SYMBOLS:
        try:
            name = get_symbol(symbol)
            results.append(serialize_tick(name))
        except HTTPException:
            continue

    return {"data": results}


@app.get("/market/tick/{symbol}")
def get_tick(symbol: str):
    name = get_symbol(symbol)
    result = serialize_tick(name)

    if not result["available"]:
        raise HTTPException(
            status_code=503,
            detail=result,
        )

    return result


@app.get("/market/candles/{symbol}")
def get_candles(
    symbol: str,
    timeframe: str = Query(default="15m"),
    count: int = Query(default=200, ge=10, le=1000),
):
    name = get_symbol(symbol)
    timeframe_key = timeframe.lower()

    if timeframe_key not in TIMEFRAMES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported timeframe: {list(TIMEFRAMES)}",
        )

    rates = mt5.copy_rates_from_pos(
        name,
        TIMEFRAMES[timeframe_key],
        0,
        count,
    )

    if rates is None:
        raise HTTPException(
            status_code=503,
            detail=f"Could not fetch candles: {mt5.last_error()}",
        )

    candles = []

    for rate in rates:
        candles.append({
            "time": int(rate["time"]),
            "open": float(rate["open"]),
            "high": float(rate["high"]),
            "low": float(rate["low"]),
            "close": float(rate["close"]),
            "volume": int(rate["tick_volume"]),
        })

    return {
        "symbol": name,
        "timeframe": timeframe_key,
        "count": len(candles),
        "data": candles,
    }
