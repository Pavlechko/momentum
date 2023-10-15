import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login.page";
import RegistrationPage from "./pages/Registration.page";
import HomePage from "./pages/Home.page";
import { getUser, isExpirationToken } from "./services/api.service";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<LoginPage />} />
          {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={'NotFoundPage /'} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
