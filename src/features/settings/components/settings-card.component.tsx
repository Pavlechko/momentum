import { FC } from 'react';
import { Switch } from '@mui/material';
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import QuoteSettings from './quote-settings.component';
import BackgroundSettings from './background-settings.component';
import MarketSettings from './market-settings.component';
import WeatherSettings from './weather-setting.component';
import ExchangeSettings from './exchange-settings.component';

import './settings-card.style.css';

type Props = {
  is24HourFormat: boolean,
  setIs24HourFormat: React.Dispatch<React.SetStateAction<boolean>>
}

export type SettingProps = {
  toastError: () => void
}

const SettingCard: FC<Props> = ({is24HourFormat, setIs24HourFormat}) => {
    const label = { inputProps: { 'aria-label': 'Toggle 24-Hour Format' } };

    const toastError = () => {
      toast.error("Something went wrong! Data is empty. Please try again later.", {
        hideProgressBar: true,
        progress: 0,
      });
    }

    return (
        <div className="container">
            <QuoteSettings toastError={toastError} />
            <BackgroundSettings toastError={toastError} />
            <WeatherSettings toastError={toastError} />
            <ExchangeSettings toastError={toastError} />
            <MarketSettings toastError={toastError} />
            <div className='clock-container'>
              <h3>Time</h3>
              <p>24-hour clock</p>
              <Switch {...label} checked={is24HourFormat} onClick={() => setIs24HourFormat(!is24HourFormat)} />
              <hr />
            </div>
            <ToastContainer className="toast-text" transition={Zoom} />
        </div>
    )
}

export default SettingCard