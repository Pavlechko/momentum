import { FC } from "react"
import Card from "@mui/material/Card"

import { Exchange } from "../models/Exchange/exchange.types"
import ExchangeCard from "../features/exchange/components/exchange-card.component"

type Props = {
    exchangeData: Exchange
}

const ExchangePage: FC<Props> = ({exchangeData}) => {

    return (
        <Card variant="outlined" sx={{border: "none", maxWidth: 320, backgroundColor: "transparent", position: "absolute", top: 0, right: 320}}>
            <ExchangeCard exchangeData={exchangeData} />
        </Card>
    )
}

export default ExchangePage;