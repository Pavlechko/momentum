import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WeatherPage from "./Weather.page";
import { getData, } from "../services/api.service";
import { UserContext } from "../context/UserContext";
import { initialData } from "../utils/initialData";
import QuoteCard from "../features/quote/components/quote-card.component";
import Greeting from "../features/greeting/components/greeting.component";

import "./Home.style.css";

const HomePage = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(initialData)

  console.log('Home page is rendering!');

  useEffect(() => {
    console.log("USE EFFECT Home page!")
    if (user.loggedIn) {
      
      getData()
        .then(data => {
          if (data) {
            console.log(data.data)
            setData(data.data)
          } else {
            console.log("from else")
          }
        })
    }
  }, [user.loggedIn])

  return(
    <div className="home" style={{position: "relative", backgroundImage: `url("${data.Backgroung.image}")`}}>
      <Link to="/signin">Login</Link>
      <Greeting name={user.name} />
      <WeatherPage weatherData={data.Weather} />
      <QuoteCard quoteData={data.Quote} />
    </div>
  )
};

export default HomePage;