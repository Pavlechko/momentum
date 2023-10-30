import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import {Rate } from "../../../models/Exchange/exchange.types";

import "./exchange-card.style.css"

type Props = {
    exchangeData: Rate,
    currencyCode: string
}

const ExchangeCard: FC<Props> = ({exchangeData, currencyCode}) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 320, minWidth: 160, backgroundColor: "transparent", border: "none"}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    1 {currencyCode} =
                </Typography>
                <Typography variant="h5" component="div">
                    {exchangeData.end_rate.toFixed(2)} UAH
                </Typography>
                {
                    exchangeData.change < 0
                    ? <Box display="flex" alignItems="center">
                        <img src={`/images/decrease.png`} alt="decrease" className="exch-img" />
                        <Typography variant="h5">
                            {exchangeData.change.toFixed(4)}
                        </Typography>
                    </Box>
                    : exchangeData.change === 0
                    ? <Box display="flex" alignItems="center">
                        <img src={`/images/equality.png`} alt="equality" className="exch-img" />
                        <Typography variant="h5">
                            {exchangeData.change.toFixed(4)}
                        </Typography>
                    </Box>
                    : <Box display="flex" alignItems="center">
                        <img src={`/images/increase.png`} alt="increase" className="exch-img" />
                        <Typography variant="h5">
                            {exchangeData.change.toFixed(4)}
                        </Typography>
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

export default ExchangeCard;