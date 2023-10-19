export type WeatherData = {
    icon: string,
    feels_like: number,
    humidity: number,
    city: string,
    source: string,
    wind_speed: number,
    temp: number,
    main: string
}

export type Weather = {
    OpenWeather: WeatherData,
    TomorrowWeather: WeatherData
}