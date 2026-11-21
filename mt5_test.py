
import MetaTrader5 as mt5

if not mt5.initialize():
    print("MT5 initialization failed:", mt5.last_error())
    raise SystemExit(1)

account = mt5.account_info()

if account is None:
    print("Account information unavailable:", mt5.last_error())
else:
    print("MT5 CONNECTED SUCCESSFULLY")
    print("Login:", account.login)
    print("Server:", account.server)
    print("Currency:", account.currency)
    print("Balance:", account.balance)

mt5.shutdown()
