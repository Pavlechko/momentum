import { FC } from 'react';
import { Switch } from '@mui/material';

import QuoteSettings from './quote-settings.component';
import BackgroundSettings from './background-settings.component';

import './settings-card.style.css';
import WeatherSettings from './weather-setting.component';
import ExchangeSettings from './exchange-settings.component';
import MarketSettings from './market-settings.component';

type Props = {
  is24HourFormat: boolean,
  setIs24HourFormat: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingCard: FC<Props> = ({is24HourFormat, setIs24HourFormat}) => {
    const label = { inputProps: { 'aria-label': 'Toggle 24-Hour Format' } };

    return (
        <div className="container">
            <QuoteSettings />
            <BackgroundSettings />
            <WeatherSettings />
            <ExchangeSettings />
            <MarketSettings />
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