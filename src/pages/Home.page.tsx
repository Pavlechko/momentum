import { useContext } from "react";
import Button from "@mui/material/Button";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

import { UserContext } from "../context/UserContext";
import { DataContext } from "../context/DataContext";
import WeatherPage from "./Weather.page";
import ExchangePage from "./Exchange.page";
import QuoteCard from "../features/quote/components/quote-card.component";
import Greeting from "../features/greeting/components/greeting.component";

import "./Home.style.css";
import MarketPage from "./Market.page";


const HomePage = () => {
  const { user } = useContext(UserContext)
  const { data } = useContext(DataContext)
  
  const clickHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
    </div>
  )
};

export default HomePage;