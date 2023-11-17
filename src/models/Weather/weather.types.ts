export type Weather = {
    icon: string,
    feels_like: number,
    humidity: number,
    city: string,
    source: string,
    wind_speed: number,
    temp: number,
    main: string
}

export type WeatherRequest = {
    city: string,
    source: string,
}

export const CITIES = [
    "Kyiv",             
    "Kharkiv",
    "Odesa",
    "Dnipro",
    "Donetsk",
    "Lviv",             
    "Vinnytsia",
    "Zaporizhia",
    "Ivano-Frankivsk",
    "Poltava",
    "Mykolaiv",
    "Chernihiv",
    "Cherkasy",
    "Chernivtsi",
    "Sumy",
    "Kherson",
    "Luhansk",
    "Rivne",
    "Ternopil", 
    "Zhytomyr",  
    "Khmelnytskyi",   
    "Uzhhorod",   
    "Lutsk",
    "Simferopol",
    "Kramatorsk",
    "Kropyvnytskyi",
]

export const WEATHER_PROVIDERS = [
	"OpenWeather", "TomorrowWeather"
]