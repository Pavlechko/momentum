import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { Market } from "../../models/Market/market.types";

type Props = {
    marketData: Market
}

const MarketCard: FC<Props> = ({marketData}) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 320, minWidth: 160, backgroundColor: "transparent", border: "none"}}>
            <CardContent>
                <Typography sx={{ fontSize: 18 }} gutterBottom>
                    {marketData.symbol}
                </Typography>
                <Typography variant="h5" component="div">
                    {Number(marketData.price).toFixed(2)} USD
                </Typography>
                {
                    Number(marketData.change) < 0
                    ? <>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                                {Number(marketData.change).toFixed(4)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <img src={`/images/decrease.png`} alt="decrease" className="exch-img" />
                            <Typography variant="h5">
                                {marketData.change_percent}
                            </Typography>
                        </Box>
                    </>
                    : Number(marketData.change) === 0
                    ? <>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                                {Number(marketData.change).toFixed(4)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <img src={`/images/equality.png`} alt="equality" className="exch-img" />
                            <Typography variant="h5">
                                {marketData.change_percent}
                            </Typography>
                        </Box>                    
                    </>
                    : <>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                                + {Number(marketData.change).toFixed(4)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <img src={`/images/increase.png`} alt="increase" className="exch-img" />
                            <Typography variant="h5">
                                {marketData.change_percent}
                            </Typography>
                        </Box>
                    </>
                    
                }
            </CardContent>
        </Card>
    )
}

export default MarketCard;