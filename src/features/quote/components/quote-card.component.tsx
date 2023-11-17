import { FC } from "react"
import { Quote } from "../../../models/Quote/quote.types"
import { Typography } from "@mui/material"

import "./quote-card.style.css"

type Props = {
    quoteData: Quote
}

const QuoteCard: FC<Props> = ({quoteData}) => {
    return (
        <div className="quote">
            <Typography className="quote-text" variant="h6" color="text.secondary">"{quoteData.content}"</Typography>
            <Typography variant="subtitle2" color="text.secondary">"{quoteData.author}"</Typography>
        </div>
    )
}

export default QuoteCard;