import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { DataContext } from '../../../context/DataContext';
import { updateApiData, updateWeather } from '../../../services/api.service';
import { Quote } from '../../../models/Quote/quote.types';

import './settings-card.style.css';
import { Background } from '../../../models/Background/background.types';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CITIES, Weather, WeatherRequest } from '../../../models/Weather/weather.typse';

const SettingCard = () => {
    const {data, setData} = useContext(DataContext)

    function skipQuoteHandler() {        
      updateApiData("quote")
      .then(r => {
        if (r) {
          const res = r.data as Quote
          data.Quote = res;
          setData(prevData => ({
            ...prevData,
            Quote: {
                author: res.author,
                content: res.content
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    }

    function skipBackgroundHandler() {
      updateApiData("background")
      .then(r => {
        if (r) {
          const res = r.data as Background
          data.Backgroung = res;
          setData(prevData => ({
            ...prevData,
            Backgroung: {
              alt: res.alt,
              image: res.image,
              photographer: res.photographer,
              source: res.source,
              source_url: res.source_url,
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    }

    const makeWeatherReq = (reqData: WeatherRequest) => {
      updateWeather(reqData)
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
      console.log(event.target.value);
      const currentCity = data.Weather.city
      const reqData: WeatherRequest = {
        city: currentCity,
        source: event.target.value
      }
      console.log("reqData: ", reqData)
      makeWeatherReq(reqData)
    };

    const handleChangeWeatherCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "") {
        return
      }
      console.log(event.target.value);
      const currentSource = data.Weather.source
      const reqData: WeatherRequest = {
        city: event.target.value,
        source: currentSource
      }
      console.log("reqData: ", reqData)
      makeWeatherReq(reqData)
    };

    return (
        <div className="container">
            <div className='quote-container'>
              <h3>Quote</h3>
              <p>Skip this quote</p>
              <IconButton aria-label="skip" onClick={skipQuoteHandler}>
                  <AutorenewIcon />
              </IconButton>
              <hr />
            </div>
            <div className='background-container'>
              <h3>Background</h3>
              <p>Skip this background image</p>
              <IconButton aria-label="skip" onClick={skipBackgroundHandler}>
                  <AutorenewIcon />
              </IconButton>
              <hr />
            </div>
            <div className='weather-container'>
              <h3>Weather</h3>
              <FormControl variant="standard">
                <InputLabel id="select-label">
                    Choose provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeWeatherPro}
                >
                    <option></option>
                    <option value={"OpenWeather"}>OpenWeatherAPI</option>
                    <option value={"TomorrowWeather"}>Tomorrow.io API</option>
                </NativeSelect>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel id="select-label">
                  Choose City
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeWeatherCity}
                >
                    <option></option>
                    {CITIES.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                </NativeSelect>
            </FormControl>
            </div>
        </div>
    )
}

export default SettingCard