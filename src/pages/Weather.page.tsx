import { useState } from "react";
import WeatherCard from "../features/weather/components/weather-card.component";
import { Weather } from "../models/Weather/weather.typse";

type Props = {
    weatherData: Weather
}

interface Option {
    label: string
}

const WeatherPage = ({weatherData}: Props) => {
    const [selectedOption, setSelectedOption] = useState("OpenWeather")

    const options: Record<string, Option> = {
        OpenWeather: {label: "OpenWeather"},
        TomorrowWeather: {label: "TomorrowWeather"}
    }

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
      };
    
    return (
        <>
            <select value={selectedOption} onChange={handleOptionChange}>
                {Object.keys(options).map((key) => (
                <option key={key} value={key}>
                    {options[key].label}
                </option>
            ))}
            </select>
            <WeatherCard weatherData={weatherData[selectedOption as keyof Weather]} />
        </>
    )
};


export default WeatherPage;