import { useContext, useState } from "react";
import { Modal, Button, IconButton, Box } from "@mui/material";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import SettingsIcon from '@mui/icons-material/Settings';

import { UserContext } from "../context/UserContext";
import { DataContext } from "../context/DataContext";
import WeatherPage from "./Weather.page";
import MarketPage from "./Market.page";
import ExchangePage from "./Exchange.page";
import QuoteCard from "../features/quote/components/quote-card.component";
import Greeting from "../features/greeting/components/greeting.component";
import SettingCard from "../features/settings/components/settings-card.component";

import "./Home.style.css";


const HomePage = () => {
  const { user } = useContext(UserContext)
  const { data } = useContext(DataContext)

  const [isOpenSettings, setIsOpenSettings] = useState(false)
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(true);

  const handleClose = () => setIsOpenSettings(false)
  
  const clickHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const optionsHandler = () => {
    setIsOpenSettings(!isOpenSettings)
  }

  return(
    <div className="home" style={{position: "relative", backgroundImage: `url("${data.Background.image}")`}}>
      <Button variant="contained" size="large" sx={{backgroundColor: "transparent", fontSize: 18}} endIcon={<FollowTheSignsIcon />} onClick={clickHandler}>SignOut</Button>
      <Greeting name={user.name} is24HourFormat={is24HourFormat} />
      <WeatherPage weatherData={data.Weather} />
      <ExchangePage exchangeData={data.Exchange} />
      <MarketPage marketData={data.Market} />
      <QuoteCard quoteData={data.Quote} />
      <div className="background-text">
        <a href={data.Background.source_url} target="_blank">{data.Background.photographer} / {data.Background.source}</a>
      </div>
      <Modal
        open={isOpenSettings}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SettingCard is24HourFormat={is24HourFormat} setIs24HourFormat={setIs24HourFormat} />
      </Modal>
      <Box className="setting">
        <IconButton  aria-label="skip" onClick={optionsHandler}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </div>
  )
};

export default HomePage;