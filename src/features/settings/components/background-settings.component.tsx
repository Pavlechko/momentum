import { useContext } from "react";
import { FormControl, IconButton, InputLabel, NativeSelect } from "@mui/material"
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { SettingProps } from "./settings-card.component";
import { DataContext } from "../../../context/DataContext";
import { updateApiData } from "../../../services/api.service";
import { BACKGROUND_PROVIDERS, Background, BackgroundRequest } from "../../../models/Background/background.types";

const BackgroundSettings = ({toastError}: SettingProps) => {
    const {data, setData} = useContext(DataContext)

    function makeBackgroundReq(reqData: BackgroundRequest) {
        updateApiData("background", reqData)
        .then(r => {
            if (r) {
                const res = r.data as Background
                data.Background = res;
                setData(prevData => ({
                    ...prevData,
                    Background: {
                        alt: res.alt,
                        image: res.image,
                        photographer: res.photographer,
                        source: res.source,
                        source_url: res.source_url,
                    },
                    Settings: {
                        ...prevData.Settings,
                        Background: {
                            alt: res.alt,
                            image: res.image,
                            photographer: res.photographer,
                            source: res.source,
                            source_url: res.source_url,
                        }
                    }
                }))
            } else {
                toastError()
            }
        })
    }
    function skipBackgroundHandler() {
        const reqData: BackgroundRequest = {
            source: data.Background.source
        }
        makeBackgroundReq(reqData) 
    }

    const handleChangeBackgroundPro = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
          return
        }
        const reqData: BackgroundRequest = {
          source: event.target.value
        }
        makeBackgroundReq(reqData)
    };

    return (
        <div className='background-container'>
            <h3>Background</h3>
            <div className="setting-container">
                <p>Skip this background image</p>
                <IconButton aria-label="skip" onClick={skipBackgroundHandler}>
                    <AutorenewIcon />
                </IconButton>
            </div>
            <FormControl variant="standard">
                <InputLabel variant="standard" id="select-label">
                    Choose provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeBackgroundPro}
                >
                    <option>{data.Settings.Background.source}</option>
                    {BACKGROUND_PROVIDERS.map((item, index) => {
                      if (item === data.Background.source) {
                        return
                      }
                      return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
              </FormControl>
            <hr />
        </div>
    )
}

export default BackgroundSettings;