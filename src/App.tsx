import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login.page";
import RegistrationPage from "./pages/Registration.page";
import ProtectHome from "./pages/ProtectHome.page";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/" element={<ProtectHome />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="*" element={'NotFoundPage /'} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
