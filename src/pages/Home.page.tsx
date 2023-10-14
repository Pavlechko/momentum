import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { getUser, isExpirationToken } from "../services/api.service";
import { UserContext } from "../context/UserContext";

let isToken = isExpirationToken(localStorage.getItem("token")!)

const HomePage = () => {
  const {user, setUser} = useContext(UserContext)

  console.log("Home page", isToken, user)

  if ( !isToken && !user.loggedIn) { //! user.loggedIn
    return <Navigate replace to="/signin" />;
  } else {
    return(
      <>
        <div>Home page</div>
        <div>User :</div>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Is Login: {(user.loggedIn)}</p>
        <Link to="/signin">Login</Link>
      </>
    ) 
  }
  };
  
  export default HomePage;