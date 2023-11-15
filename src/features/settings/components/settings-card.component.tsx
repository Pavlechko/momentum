import { FC, useContext } from 'react';
import { FormControl, InputLabel, NativeSelect, Switch } from '@mui/material';

import QuoteSettings from './quote-settings.component';
import BackgroundSettings from './background-settings.component';
import { DataContext } from '../../../context/DataContext';
import { updateApiData } from '../../../services/api.service';
import { CITIES, Weather, WeatherRequest } from '../../../models/Weather/weather.typse';
import { CURRENCIES, EXCHANGE_PROVIDERS, Exchange, ExchangeRequest } from '../../../models/Exchange/exchange.types';
import { COMPANIES, Market, MarketRequest } from '../../../models/Market/market.types';

import './settings-card.style.css';

type Props = {
  is24HourFormat: boolean,
  setIs24HourFormat: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingCard: FC<Props> = ({is24HourFormat, setIs24HourFormat}) => {
    const {data, setData} = useContext(DataContext)
    const isNBU = data.Exchange.source === "NBU"
    const isUAH = data.Exchange.from === "UAH"
    const label = { inputProps: { 'aria-label': 'Toggle 24-Hour Format' } };

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
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    }

    const makeExchangeReq = (reqData: ExchangeRequest) => {
      updateApiData("exchange", reqData)
      .then(r => {
        if (r) {
          const res = r.data as Exchange
          data.Exchange = res;
          setData(prevData => ({
            ...prevData,
            Exchange: {
              change: res.change,
              end_rate: res.end_rate,
              from: res.from,
              to: res.to,
              source: res.source
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

    const handleChangeExchengeFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "") {
        return
      }
      const currentSource = data.Exchange.source
      const toCurrency = data.Exchange.to
      const reqData: ExchangeRequest = {
        from: event.target.value,
        to: toCurrency,
        source: currentSource
      }
      makeExchangeReq(reqData)
    };

    const handleChangeExchengeTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "") {
        return
      }
      const currentSource = data.Exchange.source
      const currentBaseCurrency = data.Exchange.from
      const reqData: ExchangeRequest = {
        from: currentBaseCurrency,
        to: event.target.value,
        source: currentSource
      }
      makeExchangeReq(reqData)
    };

    const handleChangeExchengeProv = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "") {
        return
      }
      const currentBaseCurrency = data.Exchange.from
      const toCurrency = data.Exchange.to
      const reqData: ExchangeRequest = {
        from: currentBaseCurrency,
        to: toCurrency,
        source: event.target.value
      }
      makeExchangeReq(reqData)
    };

    const handleChangeMarketFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "") {
        return
      }
      const reqData: MarketRequest = {
        symbol: event.target.value
      }
      updateApiData("market", reqData)
      .then(r => {
        if (r) {
          if (r.data === "") {
            return
          }
          const res = r.data as Market
          data.Market = res;
          setData(prevData => ({
            ...prevData,
            Market: {
              symbol: res.symbol,
              price: res.price,
              change: res.change,
              change_percent: res.change_percent
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    };

    return (
        <div className="container">
            <QuoteSettings />
            <BackgroundSettings />
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
            <hr />
            </div>
            <div className='exchange-container'>
              <h3>Exchange</h3>
                {isNBU ? <p>It is not possible to choose a currency other than UAH, change the provider</p> :
                  <FormControl variant="standard">
                  <InputLabel id="select-label">
                    From
                  </InputLabel>
                  <NativeSelect
                    onChange={handleChangeExchengeFrom}
                  >
                    <option></option>
                    {CURRENCIES.map((item, index) => {
                      if (item === data.Exchange.from || item === data.Exchange.to) {
                        return
                      }
                      if (data.Exchange.source === "NBU") {
                        return
                      }
                      return <option key={index} value={item}>{item}</option>
                    })}
                  </NativeSelect>
                  </FormControl>
                }
              <br/>
              <FormControl variant="standard">
                <InputLabel id="select-label">
                    To
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeExchengeTo}
                >
                    <option></option>
                    {CURRENCIES.map((item, index) => {
                      if (item === data.Exchange.to || item === data.Exchange.from) {
                        return
                      }
                      return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
              </FormControl>
              <br/>
              { !isUAH ? <p>Unable to select another provider, change base currency to UAH</p> : 
                <FormControl variant="standard">
                <InputLabel id="select-label">
                  Choose provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeExchengeProv}
                >
                    <option></option>
                    {EXCHANGE_PROVIDERS.map((item, index) => {
                      if (item === data.Exchange.source) {
                        return
                      }
                      return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
              </FormControl>
              }              
              <hr />
            </div>
            <div className='market-container'>
              <h3>Market</h3>
              <FormControl variant="standard">
                  <InputLabel id="select-label">
                    Company
                  </InputLabel>
                  <NativeSelect
                    onChange={handleChangeMarketFrom}
                  >
                    <option></option>
                    {COMPANIES.map((item, index) => {
                      if (item === data.Market.symbol) {
                        return
                      }
                      return <option key={index} value={item}>{item}</option>
                    })}
                  </NativeSelect>
                  </FormControl>
              <hr />
            </div>
            <div className='clock-container'>
              <h3>Time</h3>
              <p>24-hour clock</p>
              <Switch {...label} checked={is24HourFormat} onClick={() => setIs24HourFormat(!is24HourFormat)} />
              <hr />
            </div>
        </div>
    )
}

export default SettingCard