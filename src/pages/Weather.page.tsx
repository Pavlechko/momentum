import WeatherCard from "../features/weather/components/weather-card.component";
import { Weather } from "../models/Weather/weather.typse";

type Props = {
    weatherData: Weather
}

const WeatherPage = ({weatherData}: Props) => {
    
    return (
        <WeatherCard weatherData={weatherData} />
    )
};


export default WeatherPage;