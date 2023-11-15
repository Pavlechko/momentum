import { ResponseData } from "../models/response.types";

const localData = localStorage.getItem("data");

const data = JSON.parse(localData as string) as ResponseData

export const initialData: ResponseData = data ? data : {
  Weather: {
      icon: "string",
      feels_like: 0,
      humidity: 0,
      city: "string",
      source: "string",
      wind_speed: 0,
      temp: 0,
      main: "string"
  },
  Quote: {
      author: "string",
      content: "string"
  },
  Background: {
    alt: "string",
    image: "string",
    photographer: "string",
    source: "string",
    source_url: "string",
  },
  Exchange: {
        change: 0,
        end_rate: 0,
        from: "string",
        to: "string",
        source: "string"
  },
  Market: {
    symbol: "string",
    price: "string",
    change: "string",
    change_percent: "string"
  },
  Settings: {
    Weather: {city: "string", source: "string"},
    Quote: {author: "string", content: "string"},
    Background: {
      alt: "string",
      image: "string",
      photographer: "string",
      source: "string",
      source_url: "string",
    },
    Exchange: {from: "string", to: "string", source: "string"},
    Market: {symbol: "string"}
  }
}