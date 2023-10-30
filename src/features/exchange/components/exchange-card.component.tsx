import { FC } from "react";
import { NBU } from "../../../models/Exchange/exchange.types";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    exchangeData: NBU
}

const ExchangeCard: FC<Props> = ({exchangeData}) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 320, backgroundColor: "transparent", border: "none"}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    1 {exchangeData.symbol} =
                </Typography>
                <Typography variant="h5" component="div">
                    {exchangeData.rate} UAH
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ExchangeCard;