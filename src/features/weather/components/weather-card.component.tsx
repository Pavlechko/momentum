import { FC, useState } from "react";
import { Box, Card, CardContent, IconButton, IconButtonProps, Typography, styled } from "@mui/material";

import { Weather } from "../../../models/Weather/weather.typse";

import "./weather-card.style.css";

type Props = {
    weatherData: Weather
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const WeatherCard: FC<Props> = ({weatherData}) => {

    const getWeatherIcon = (code: string) => {
        return <img src={`/images/${code}.png`} alt="Weather Icon" />
    };

    return (
        <Card className="weather" variant="outlined" sx={{ maxWidth: 320, backgroundColor: "transparent", border: "none", position: "absolute", top: 0, right: 0}}>
          <CardContent sx={{color: "whitesmoke", paddingBottom: 0}}>
            <Typography variant="h5" component="div">
              {weatherData.city}
            </Typography>
            <Box display="flex" alignItems="center">
                {getWeatherIcon(weatherData.icon)}
                <Typography variant="h5">
                {Math.round(weatherData.temp)}°C
                </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{color: "whitesmoke"}}>
                Feels like: {Math.round(weatherData.feels_like)}°C
            </Typography>
            <Box display="flex" alignItems="center">
                <Typography variant="h6" component="div" color="text.secondary" sx={{color: "whitesmoke"}}>
                    {weatherData.main}
                </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" sx={{color: "whitesmoke"}}>
                Humidity: {weatherData.humidity}% Wind speed: {weatherData.wind_speed}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{color: "whitesmoke"}}>
              Source: {weatherData.source}
            </Typography>
          </CardContent>
        </Card>
    );
};


export default WeatherCard;