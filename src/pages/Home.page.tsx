import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

import { UserContext } from "../context/UserContext";
import { DataContext } from "../context/DataContext";
import WeatherPage from "./Weather.page";
import QuoteCard from "../features/quote/components/quote-card.component";
import Greeting from "../features/greeting/components/greeting.component";

import "./Home.style.css";


const HomePage = () => {
  const { user } = useContext(UserContext)
  const { data } = useContext(DataContext)
  
  const clickHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }
  console.log('Home page is rendering!');

  return(
    <div className="home" style={{position: "relative", backgroundImage: `url("${data.Backgroung.image}")`}}>
      <Button variant="contained" size="large" sx={{backgroundColor: "transparent", fontSize: 18}} endIcon={<FollowTheSignsIcon />} onClick={clickHandler}>SignOut</Button>
      <Greeting name={user.name} />
      <WeatherPage weatherData={data.Weather} />
      <QuoteCard quoteData={data.Quote} />
    </div>
  )
};

export default HomePage;