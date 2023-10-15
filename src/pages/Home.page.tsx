import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { getData, isExpirationToken } from "../services/api.service";
import { UserContext } from "../context/UserContext";

type Data = {
  Exchange: {
    Name: string
  },
  Weather: {
    Name: string
  }
}

const initialData: Data = {
  Exchange: {
    Name: "string"
  },
  Weather: {
    Name: "string"
  }
}

let isToken = isExpirationToken(localStorage.getItem("token")!)

const HomePage = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(initialData)
  console.log("Home page", isToken, user)

  useEffect(() => {
    if (isToken) {
      getData()
        .then(data => {
          setData(data?.data)
        })
    }
  }, [isToken])

  if ( !isToken && !user.loggedIn) { //! user.loggedIn
    return <Navigate replace to="/signin" />;
  } else {
    return(
      <>
        <Link to="/signin">Login</Link>
        <table style={{border: "1px solid"}}>
          <tr>
            <th>Home page</th>
          </tr>
          <tr>
            <td>ID:</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Data from server:</td>
            <td>{data.Weather.Name}</td>
          </tr>
          <tr>
            <td>Data from server:</td>
            <td>{data.Exchange.Name}</td>
          </tr>
        </table>
      </>
    ) 
  }
  };
  
  export default HomePage;