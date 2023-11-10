import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { DataContext } from '../../../context/DataContext';
import { updateApiData } from '../../../services/api.service';
import { Quote } from '../../../models/Quote/quote.types';

import './settings-card.style.css';
import { BackgroundData } from '../../../models/Background/background.types';

const SettingCard = () => {
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
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    }

    function skipBackgroundHandler() {
      updateApiData("background")
      .then(r => {
        if (r) {
          const res = r.data as BackgroundData
          data.Backgroung.Unsplash = res;
          setData(prevData => ({
            ...prevData,
            Backgroung:{
              Pexels: {
                alt: res.alt,
                image: res.image,
                photographer: res.photographer,
                source: res.source,
                source_url: res.source_url,
              },
              Unsplash: {
                alt: res.alt,
                image: res.image,
                photographer: res.photographer,
                source: res.source,
                source_url: res.source_url,
              }
            }
          }))
        } else {
          console.log("Something went wrong! Data is empty. Initial data will be displayed.")
        }
      })
    }
    return (
        <div className="container">
            <div className='quote-container'>
                <h3>Quote</h3>
                <p>Skip this quote</p>
                <IconButton aria-label="skip" onClick={skipQuoteHandler}>
                    <AutorenewIcon />
                </IconButton>
                <hr />
            </div>
            <div>
                <h3>Background</h3>
                <p>Skip this background image</p>
                <IconButton aria-label="skip" onClick={skipBackgroundHandler}>
                    <AutorenewIcon />
                </IconButton>
                <hr />
            </div>
        </div>
    )
}

export default SettingCard