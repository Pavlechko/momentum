import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WeatherPage from "./Weather.page";
import { getData, isExpirationToken } from "../services/api.service";
import { UserContext } from "../context/UserContext";
import { initialData } from "../utils/initialData";
import QuoteCard from "../features/quote/components/quote-card.component";

import "./Home.style.css";

const HomePage = () => {
  let isToken = isExpirationToken(localStorage.getItem("token")!)
  const { user } = useContext(UserContext)
  const [data, setData] = useState(initialData)

  console.log("Home page", isToken, user)

  useEffect(() => {
    console.log("USE EFFECT!")
    console.log("USE EFFECT! TOKEN", isToken)
    if (isToken) {
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
  }, [user])

  return(
    <div className="home" style={{backgroundImage: `url("${data.Backgroung.image}")`}}>
      <Link to="/signin">Login</Link>
      <table style={{border: "1px solid"}}>
        <tbody>
          <tr>
            <th>Home page</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{user.id}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{user.name}</td>
          </tr>
        </tbody>
      </table>
      <WeatherPage weatherData={data.Weather} />
      <QuoteCard quoteData={data.Quote} />
    </div>
  )
};

export default HomePage;