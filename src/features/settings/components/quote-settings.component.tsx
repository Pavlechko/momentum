import { useContext } from "react";
import { IconButton } from "@mui/material"
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { SettingProps } from "./settings-card.component";
import { updateApiData } from "../../../services/api.service";
import { Quote } from "../../../models/Quote/quote.types";
import { DataContext } from "../../../context/DataContext";

import "./quote-settings.style.css";

const QuoteSettings = ({toastError}: SettingProps) => {
    const {data, setData} = useContext(DataContext)

    function skipQuoteHandler() {        
        updateApiData("quote")
        .then(r => {
            if (r) {
                const res = r.data as Quote
                data.Quote = res;
                setData(prevData => ({
                    ...prevData,
                    Quote: {
                        author: res.author,
                        content: res.content
                    },
                    Settings: {
                        ...prevData.Settings,
                        Quote: {
                            author: res.author,
                            content: res.content
                        }
                    }
                }))
            } else {
                toastError()
            }
        })
    }

    return (
        <div className='quote-container'>
            <h3>Quote</h3>
            <div className="setting-container">
                <p>Skip this quote</p>
                <IconButton aria-label="skip" onClick={skipQuoteHandler}>
                    <AutorenewIcon />
                </IconButton>
            </div>
            <hr />
        </div>
    )
}

export default QuoteSettings