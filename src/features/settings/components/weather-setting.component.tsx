import { useContext } from "react"
import { FormControl, InputLabel, NativeSelect } from "@mui/material"

import { CITIES, WEATHER_PROVIDERS, Weather, WeatherRequest } from "../../../models/Weather/weather.typse"
import { DataContext } from "../../../context/DataContext"
import { updateApiData } from "../../../services/api.service"

const WeatherSettings = () => {
    const {data, setData} = useContext(DataContext)

    const makeWeatherReq = (reqData: WeatherRequest) => {
        updateApiData("weather", reqData)
        .then(r => {
            if (r) {
                const res = r.data as Weather
                data.Weather = res;
                setData(prevData => ({
                    ...prevData,
                    Weather: {
                        icon: res.icon,
                        feels_like: res.feels_like,
                        humidity: res.humidity,
                        city: res.city,
                        source: res.source,
                        wind_speed: res.wind_speed,
                        temp: res.temp,
                        main: res.main,
                    },
                    Settings: {
                        ...prevData.Settings,
                        Weather: {
                            city: res.city,
                            source: res.source
                        }
                    }
                }))
            } else {
                console.log("Something went wrong! Data is empty. Initial data will be displayed.")
            }
        })
    }

    const handleChangeWeatherPro = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
            return
        }
        const currentCity = data.Weather.city
        const reqData: WeatherRequest = {
            city: currentCity,
            source: event.target.value
        }
        makeWeatherReq(reqData)
    };
  
    const handleChangeWeatherCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
            return
        }
        const currentSource = data.Weather.source
        const reqData: WeatherRequest = {
            city: event.target.value,
            source: currentSource
        }
        makeWeatherReq(reqData)
    };

    return (
        <div className='weather-container'>
            <h3>Weather</h3>
            <FormControl variant="standard">
                <InputLabel id="select-label">
                    Choose provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeWeatherPro}
                >
                    <option>{data.Settings.Weather.source}</option>
                    {WEATHER_PROVIDERS.map((item, index) => {
                        if (item === data.Weather.source) {
                        return
                        }
                        return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
            </FormControl>
            <br />
            <FormControl variant="standard">
                <InputLabel id="select-label">
                    Choose City
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeWeatherCity}
                >
                    <option>{data.Settings.Weather.city}</option>
                    {CITIES.map((item, index) => {
                        if (item === data.Weather.city) {
                        return
                        }
                        return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
            </FormControl>
            <hr />
        </div>
    )
}

export default WeatherSettings;