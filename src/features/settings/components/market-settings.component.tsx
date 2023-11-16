import { useContext } from "react";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

import { SettingProps } from "./settings-card.component";
import { DataContext } from "../../../context/DataContext";
import { COMPANIES, Market, MarketRequest } from "../../../models/Market/market.types";
import { updateApiData } from "../../../services/api.service";

const MarketSettings = ({toastError}: SettingProps) => {
    const {data, setData} = useContext(DataContext)

    const handleChangeMarketFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
            return
        }
        const reqData: MarketRequest = {
            symbol: event.target.value
        }
        updateApiData("market", reqData)
        .then(r => {
            if (r) {
                if (r.data === "") {
                    return
                }
                const res = r.data as Market
                data.Market = res;
                setData(prevData => ({
                    ...prevData,
                    Market: {
                    symbol: res.symbol,
                    price: res.price,
                    change: res.change,
                    change_percent: res.change_percent
                    },
                    Settings: {
                        ...prevData.Settings,
                        Market: {
                            symbol: res.symbol
                        }
                    }
                }))
            } else {
                toastError()
            }
        })
    };

    return (
        <div className='market-container'>
            <h3>Market</h3>
            <FormControl variant="standard">
                <InputLabel id="select-label">
                    Company
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeMarketFrom}
                >
                <option>{data.Settings.Market.symbol}</option>
                {COMPANIES.map((item, index) => {
                    if (item === data.Market.symbol) {
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

export default MarketSettings;