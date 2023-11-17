import { Background } from "./Background/background.types"
import { Exchange, ExchangeRequest } from "./Exchange/exchange.types"
import { Quote } from "./Quote/quote.types"
import { Market, MarketRequest } from "./Market/market.types"
import { Weather, WeatherRequest } from "./Weather/weather.types"

export type Settings = {
    Weather: WeatherRequest
    Quote: Quote
    Background: Background
    Exchange: ExchangeRequest
    Market: MarketRequest
}

export type ResponseData = {
    Weather: Weather
    Quote: Quote
    Background: Background
    Exchange: Exchange
    Market: Market
    Settings: Settings
}