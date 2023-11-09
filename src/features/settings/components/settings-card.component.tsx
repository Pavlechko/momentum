import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { DataContext } from '../../../context/DataContext';
import { updateQuote } from '../../../services/api.service';
import { Quote } from '../../../models/Quote/quote.types';

import './settings-card.style.css';

const SettingCard = () => {
    const {data, setData} = useContext(DataContext)
    function skipQuoteHandler() {
        
        updateQuote()
        .then(r => {
            if (r) {
              const res = r.data as Quote
              console.log(data)
              data.Quote = res;
              setData(prevData => ({
                ...prevData,
                Quote: {
                    author: res.author,
                    content: res.content
                }
              }))
              console.log(data)
            } else {
              console.log("Something went wrong! Data is empty. Initial data will be displayed.")
            }
          })

    }
    return (
        <div className="container">
            <div>
                <h3>Quote</h3>
                <p>Skip this quote</p>
                <IconButton aria-label="skip" onClick={skipQuoteHandler}>
                    <AutorenewIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SettingCard