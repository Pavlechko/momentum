import { ResponseData } from "../models/response.types";

export const initialData: ResponseData = {
    Weather: {
      OpenWeather: {
        icon: "string",
        feels_like: 0,
        humidity: 0,
        city: "string",
        source: "string",
        wind_speed: 0,
        temp: 0,
        main: "string"
      },
      TomorrowWeather: {
        icon: "string",
        feels_like: 0,
        humidity: 0,
        city: "string",
        source: "string",
        wind_speed: 0,
        temp: 0,
        main: "string"
      }
    },
    Quote: {
        author: "string",
        content: "string"
    },
    Backgroung: {
      Pexels: {
        alt: "string",
        image: "string",
        photographer: "string",
        source: "string",
        source_url: "string",
      },
      Unsplash: {
        alt: "string",
        image: "string",
        photographer: "string",
        source: "string",
        source_url: "string",
      }
    },
    Exchange: [
      {
      currency: "string",
	    rate: 0,
	    symbol: "string",
      }
    ]
}