import { FC, useState } from "react"
import { Box, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import { Exchange } from "../models/Exchange/exchange.types"
import ExchangeCard from "../features/exchange/components/exchange-card.component"

type Props = {
    exchangeData: Exchange
}

const ExchangePage: FC<Props> = ({exchangeData}) => {
    // const [carrency, setCarrency] = useState('USD');
    // const [selectedOption, setSelectedOption] = useState("NBU")


    // const handleChange = (event: SelectChangeEvent) => {
    //     setCarrency(event.target.value as string);
    // };

    // const handleChangeProvider = (event: SelectChangeEvent) => {
    //     setSelectedOption(event.target.value);
    // };

    return (
        <Card variant="outlined" sx={{border: "none", maxWidth: 320, backgroundColor: "transparent", position: "absolute", top: 0, right: 320}}>
            <ExchangeCard exchangeData={exchangeData} />
            {/* <Box>
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
                            Object.keys(exchangeData[selectedOption as keyof Exchange]).map((exch) => {
                                return <MenuItem value={exch} key={exch}>{exch}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl variant="standard">
                    <InputLabel id="select-label"></InputLabel>
                    <Select
                        sx={{color: "whitesmoke"}}
                        labelId="select-label"
                        id="select"
                        value={selectedOption}
                        label="exchange"
                        onChange={handleChangeProvider}
                    >
                        <MenuItem value="NBU">NBU</MenuItem>
                        <MenuItem value="Layer">Layer</MenuItem>
                    </Select>
                </FormControl>
            </Box> */}
        </Card>
    )
}

export default ExchangePage;