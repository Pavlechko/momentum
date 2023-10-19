import { Navigate } from "react-router-dom";
import { isExpirationToken } from "../services/api.service";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import HomePage from "./Home.page";

let isToken: boolean = isExpirationToken(localStorage.getItem("token")!)

const ProtectHome = () => {
  const { user } = useContext(UserContext)

    if ( !isToken && !user.loggedIn) {
        return <Navigate replace to="/signin" />;
      } else {
        return <HomePage />
      }
}

export default ProtectHome;
