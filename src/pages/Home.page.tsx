import { Navigate } from "react-router-dom";
import { isExpirationToken } from "../services/api.service";

const HomePage = () => {
  if (!localStorage.getItem("token") || !isExpirationToken(localStorage.getItem("token")!)) {
    return <Navigate replace to="/signin" />;
  } else {
    return <div>Home page</div>;
  }
  };
  
  export default HomePage;