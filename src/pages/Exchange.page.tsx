import { FC, useState } from "react"
import { Box, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import { Exchange } from "../models/Exchange/exchange.types"
import ExchangeCard from "../features/exchange/components/exchange-card.component"

type Props = {
    exchangeData: Exchange
}

const ExchangePage: FC<Props> = ({exchangeData}) => {
    const [carrency, setCarrency] = useState('USD');

    const handleChange = (event: SelectChangeEvent) => {
        setCarrency(event.target.value as string);
    };

    return (
        <Card variant="outlined" sx={{border: "none", maxWidth: 320, backgroundColor: "transparent", position: "absolute", top: 0, right: 320}}>
            {
                Object.keys(exchangeData.NBU).map((exch) => {
                    if (exch === carrency) {
                        return <ExchangeCard key={exch} currencyCode={exch} exchangeData={exchangeData.NBU[exch]} />
                    }
                })
            }          
            <Box>
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        sx={{color: "whitesmoke"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={carrency}
                        label="Carrency"
                        onChange={handleChange}
                    >
                        {
                            Object.keys(exchangeData.NBU).map((exch) => {
                                return <MenuItem value={exch} key={exch}>{exch}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
        </Card>
    )
}

export default ExchangePage;