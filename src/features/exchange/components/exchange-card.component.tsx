import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import {Exchange } from "../../../models/Exchange/exchange.types";

import "./exchange-card.style.css"

type Props = {
    exchangeData: Exchange,
}

const ExchangeCard: FC<Props> = ({exchangeData}) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 320, minWidth: 160, backgroundColor: "transparent", border: "none"}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    1 {exchangeData.from} =
                </Typography>
                <Typography title={exchangeData.end_rate.toFixed(4).toString()} variant="h5" component="div">
                    {exchangeData.end_rate.toFixed(2)} {exchangeData.to}
                </Typography>
                <Box display="flex" alignItems="center">
                    {
                        exchangeData.change < 0 
                        ? 
                            <img src={`/images/decrease.png`} alt="decrease" className="exch-img" />
                        : exchangeData.change === 0
                        ? 
                            <img src={`/images/equality.png`} alt="equality" className="exch-img" />
                        : 
                            <img src={`/images/increase.png`} alt="increase" className="exch-img" />
                    }
                        <Typography title={exchangeData.change.toFixed(6).toString()} variant="h5">
                            {exchangeData.change.toFixed(4)}
                        </Typography>
                </Box>
            </CardContent>
            <Typography variant="body2" color="text.secondary" sx={{color: "whitesmoke"}}>
              Source: {exchangeData.source}
            </Typography>
        </Card>
    )
}

export default ExchangeCard;