import { Quote } from "./Quote/quote.types"
import { Weather } from "./Weather/weather.typse"

export type ResponseData = {
    Weather: Weather
    Quote: Quote
}