import { Background } from "./Background/background.types"
import { NBU } from "./Exchange/exchange.types"
import { Quote } from "./Quote/quote.types"
import { Weather } from "./Weather/weather.typse"

export type ResponseData = {
    Weather: Weather
    Quote: Quote
    Backgroung: Background
    Exchange: Array<NBU>
}