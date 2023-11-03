import { Background } from "./Background/background.types"
import { Exchange } from "./Exchange/exchange.types"
import { Quote } from "./Quote/quote.types"
import { Market } from "./Market/market.types"
import { Weather } from "./Weather/weather.typse"

export type ResponseData = {
    Weather: Weather
    Quote: Quote
    Backgroung: Background
    Exchange: Exchange
    Market: Market
}