import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import { UserContext } from "../context/UserContext";
import { DataContext } from "../context/DataContext";
import WeatherPage from "./Weather.page";
import ExchangePage from "./Exchange.page";
import QuoteCard from "../features/quote/components/quote-card.component";
import Greeting from "../features/greeting/components/greeting.component";

import "./Home.style.css";
import MarketPage from "./Market.page";
import SettingCard from "../features/settings/components/settings-card.component";


const HomePage = () => {
  const { user } = useContext(UserContext)
  const { data } = useContext(DataContext)

  const [isOpenSettings, setIsOpenSettings] = useState(false)
  
  const clickHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const optionsHandler = () => {
    // use State with toogle
    setIsOpenSettings(!isOpenSettings)
  }

  return(
    <div className="home" style={{position: "relative", backgroundImage: `url("${data.Backgroung.Unsplash.image}")`}}>
      <Button variant="contained" size="large" sx={{backgroundColor: "transparent", fontSize: 18}} endIcon={<FollowTheSignsIcon />} onClick={clickHandler}>SignOut</Button>
      <Greeting name={user.name} />
      <WeatherPage weatherData={data.Weather} />
      <ExchangePage exchangeData={data.Exchange} />
      <MarketPage marketData={data.Market} />
      <QuoteCard quoteData={data.Quote} />
      <div className="background-text">
        <a href={data.Backgroung.Unsplash.source_url} target="_blank">{data.Backgroung.Unsplash.photographer} / {data.Backgroung.Unsplash.source}</a>
      </div>
      {isOpenSettings && <SettingCard />}
      <IconButton aria-label="skip" onClick={optionsHandler}>
        <SettingsIcon />
      </IconButton>
    </div>
  )
};

export default HomePage;