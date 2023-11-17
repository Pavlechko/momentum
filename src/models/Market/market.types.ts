export type Market = {
    symbol: string
    price: string
    change: string
    change_percent: string
}

export type MarketRequest = {
    symbol: string
}

export const COMPANIES = [
    "TSLA", "AAPL", "NVDA", "AMZN", "LCID", "MSFT", "SIEGY", "ENR", "LHX", "BMWYY", "DAX"
]