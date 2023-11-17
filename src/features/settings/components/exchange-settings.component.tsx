import { useContext } from "react"
import { FormControl, InputLabel, NativeSelect } from "@mui/material"

import { DataContext } from "../../../context/DataContext"
import { CURRENCIES, EXCHANGE_PROVIDERS, Exchange, ExchangeRequest } from "../../../models/Exchange/exchange.types"
import { updateApiData } from "../../../services/api.service"

const ExchangeSettings = () => {
    const {data, setData} = useContext(DataContext)
    const isNBU = data.Exchange.source === "NBU"
    const isUAH = data.Exchange.from === "UAH"

    const makeExchangeReq = (reqData: ExchangeRequest) => {
        updateApiData("exchange", reqData)
        .then(r => {
            if (r) {
                const res = r.data as Exchange
                data.Exchange = res;
                setData(prevData => ({
                    ...prevData,
                    Exchange: {
                        change: res.change,
                        end_rate: res.end_rate,
                        from: res.from,
                        to: res.to,
                        source: res.source
                    },
                    Settings: {
                        ...prevData.Settings,
                        Exchange: {
                            from: res.from,
                            to: res.to,
                            source: res.source
                        }
                    }
                }))
            } else {
                console.log("Something went wrong! Data is empty. Initial data will be displayed.")
            }
        })
    }

    const handleChangeExchengeFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
          return
        }
        const currentSource = data.Exchange.source
        const toCurrency = data.Exchange.to
        const reqData: ExchangeRequest = {
          from: event.target.value,
          to: toCurrency,
          source: currentSource
        }
        makeExchangeReq(reqData)
      };
  
      const handleChangeExchengeTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
          return
        }
        const currentSource = data.Exchange.source
        const currentBaseCurrency = data.Exchange.from
        const reqData: ExchangeRequest = {
          from: currentBaseCurrency,
          to: event.target.value,
          source: currentSource
        }
        makeExchangeReq(reqData)
      };
  
      const handleChangeExchengeProv = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
          return
        }
        const currentBaseCurrency = data.Exchange.from
        const toCurrency = data.Exchange.to
        const reqData: ExchangeRequest = {
          from: currentBaseCurrency,
          to: toCurrency,
          source: event.target.value
        }
        makeExchangeReq(reqData)
      };
    
    return (
        <div className='exchange-container'>
            <h3>Exchange</h3>
            {isNBU ? <p>It is not possible to choose a currency other than UAH, change the provider</p> :
                <FormControl variant="standard">
                    <InputLabel id="select-label">
                        From
                    </InputLabel>
                    <NativeSelect
                        onChange={handleChangeExchengeFrom}
                    >
                    <option>{data.Settings.Exchange.from}</option>
                    {CURRENCIES.map((item, index) => {
                        if (item === data.Exchange.from || item === data.Exchange.to) {
                        return
                        }
                        if (data.Exchange.source === "NBU") {
                        return
                        }
                        return <option key={index} value={item}>{item}</option>
                    })}
                    </NativeSelect>
                </FormControl>
            }
            <br/>
            <FormControl variant="standard">
                <InputLabel id="select-label">
                    To
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeExchengeTo}
                >
                    <option>{data.Settings.Exchange.to}</option>
                    {CURRENCIES.map((item, index) => {
                        if (item === data.Exchange.to || item === data.Exchange.from) {
                        return
                        }
                        return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
            </FormControl>
            <br/>
            { !isUAH ? <p>Unable to select another provider, change base currency to UAH</p> : 
            <FormControl variant="standard">
                <InputLabel id="select-label">
                    Choose provider
                </InputLabel>
                <NativeSelect
                    onChange={handleChangeExchengeProv}
                >
                    <option>{data.Settings.Exchange.source}</option>
                    {EXCHANGE_PROVIDERS.map((item, index) => {
                        if (item === data.Exchange.source) {
                        return
                        }
                        return <option key={index} value={item}>{item}</option>
                    })}
                </NativeSelect>
            </FormControl>
            }              
            <hr />
        </div>
    )
}

export default ExchangeSettings;