import { FC, useState } from "react"
import { NBU } from "../models/Exchange/exchange.types"
import ExchangeCard from "../features/exchange/components/exchange-card.component"
import { Box, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

type Props = {
    exchangeData: NBU[]
}

const ExchangePage: FC<Props> = ({exchangeData}) => {
    const [carrency, setCarrency] = useState('USD');

    const handleChange = (event: SelectChangeEvent) => {
        setCarrency(event.target.value as string);
    };

    return (
        <Card variant="outlined" sx={{border: "none", maxWidth: 320, backgroundColor: "transparent", position: "absolute", top: 0, right: 320}}>
            {
                exchangeData.map((exch) => {
                    if (exch.symbol === carrency) {
                        return <ExchangeCard key={exch.symbol} exchangeData={exch} />
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
                            exchangeData.map((exch) => {
                                return <MenuItem value={exch.symbol} key={exch.symbol}>{exch.symbol}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
        </Card>
    )
}

export default ExchangePage;