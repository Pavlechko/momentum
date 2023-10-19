import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getData, isExpirationToken } from "../services/api.service";
import { UserContext } from "../context/UserContext";
import { ResponseData } from "../models/response.types";
import WeatherPage from "./Weather.page";



const initialData: ResponseData = {
  Weather: {
    OpenWeather: {
      icon: "string",
      feels_like: 0,
      humidity: 0,
      city: "string",
      source: "string",
      wind_speed: 0,
      temp: 0,
      main: "string"
    },
    TomorrowWeather: {
      icon: "string",
      feels_like: 0,
      humidity: 0,
      city: "string",
      source: "string",
      wind_speed: 0,
      temp: 0,
      main: "string"
    }
  }
  
}

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
          console.log(data?.data)
          setData(data?.data)
        })
    }
  }, [user])

  return(
    <>
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
    </>
  )
};

export default HomePage;