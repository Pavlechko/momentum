import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.page";
import RegistrationPage from "./pages/Registration.page";
import HomePage from "./pages/Home.page";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="*" element={'NotFoundPage /'} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
