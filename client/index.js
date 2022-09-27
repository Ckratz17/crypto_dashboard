const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

//method, response, callback
app.get('/', (req, res) => {
    res.json('hi')
})

app.get('/converter', (req, res) => {
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency
    console.log(req.query.to_currency)
    console.log(req.query.from_currency)

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: toCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: fromCurrency},
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    }

    axios.request(options).then((response) =>{
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    }).catch((error) =>{
        console.error(error);
    })
})

app.get('/news', (req, res) => {
    
    const options = {
        method: 'GET',
        url: 'https://crypto-news-live3.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
        }
    };

            
    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error);
    });
})


app.listen(8000, () => console.log(`server is running on port ${PORT}`))