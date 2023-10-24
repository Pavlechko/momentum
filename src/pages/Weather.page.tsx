import { useState } from "react";
import WeatherCard from "../features/weather/components/weather-card.component";
import { Weather } from "../models/Weather/weather.typse";

type Props = {
    weatherData: Weather
}

const WeatherPage = ({weatherData}: Props) => {
    const [selectedOption, setSelectedOption] = useState("OpenWeather")
    
    return (
        <WeatherCard weatherData={weatherData[selectedOption as keyof Weather]} setSelectedOption={setSelectedOption} />
    )
};


export default WeatherPage;