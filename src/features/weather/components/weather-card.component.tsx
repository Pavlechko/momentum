import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { WeatherData } from "../../../models/Weather/weather.typse";

type Props = {
    weatherData: WeatherData
}

const WeatherCard: FC<Props> = ({weatherData}) => {
    const getWeatherIcon = (code: string) => {
        return <img src={`/images/${code}.png`} alt="Weather Icon" />
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {weatherData.city}
            </Typography>
            <Box display="flex" alignItems="center">
                {getWeatherIcon(weatherData.icon)}
                <Typography variant="h5">
                {Math.round(weatherData.temp)}°C
                </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
                Feels like: {Math.round(weatherData.feels_like)}°C
            </Typography>
            <Box display="flex" alignItems="center">
                <Typography variant="h6" component="div" color="text.secondary">
                    {weatherData.main}
                </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
                Humidity: {weatherData.humidity}% Wind speed: {weatherData.wind_speed}m/s
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Source: {weatherData.source}
            </Typography>
          </CardContent>
        </Card>
    );
};


export default WeatherCard;