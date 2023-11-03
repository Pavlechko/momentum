import { FC } from "react";
import { Market } from "../models/Market/market.types";
import MarketCard from "../features/market/market-card.component";
import { Card } from "@mui/material";

type Props = {
    marketData: Market
}

const MarketPage: FC<Props> = ({marketData}) => {
    return(
        <Card variant="outlined" sx={{border: "none", width: 180, backgroundColor: "transparent", position: "absolute", top: 0, right: 500}}>
            <MarketCard marketData={marketData} />
        </Card>
    ) 
}

export default MarketPage;