import { FC, useState } from "react";
import { Box, Card, CardActions, CardContent, Collapse, FormControl, IconButton, IconButtonProps, InputLabel, NativeSelect, SelectChangeEvent, Typography, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { WeatherData } from "../../../models/Weather/weather.typse";

import "./weather-card.style.css";

type Props = {
    weatherData: WeatherData
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
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

const WeatherCard: FC<Props> = ({weatherData, setSelectedOption}) => {
    const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        setExpanded(!expanded);
    };

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
          <CardActions disableSpacing>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            
            >
            <ExpandMoreIcon sx={{color: "whitesmoke"}} />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{color: "whitesmoke"}}>
                    Choose weather provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChange}
                >
                    <option></option>
                    <option value={"OpenWeather"}>OpenWeatherAPI</option>
                    <option value={"TomorrowWeather"}>Tomorrow.io API</option>
                </NativeSelect>
            </FormControl>
          </Collapse>
        </Card>
    );
};


export default WeatherCard;