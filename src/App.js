import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

// git add .
// git commit -m "cleaning up"
// git remote add origin https://github.com/rfkinline/coin-exchange.git
// git push -u origin master
// npm start

// Create new project: $ npx create-react-app coin-invest

const Div = styled.div`
  text-align: center;
  background-color: #553d74;
  color: #cccccc;
  `;

const COIN_COUNT = 10;

function App(props) {
  const [coinData, setCoinData] = useState([]);

const componentDidMount = async () => {
  // Needed to retrieve coins sorted by rank and then retrieve price
  const response = await axios.get('https://api.coinpaprika.com/v1/coins')
  const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
  //Retrieve the prices
  const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
  const promises = coinIds.map(id => axios.get(tickerUrl + id));
  const coinData = await Promise.all(promises);
  const coinPriceData = coinData.map(function(response) {
    const coin = response.data;
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      rank: coin.rank,
      price: coin.quotes['USD'].price,
    }
  });
  setCoinData(coinPriceData);
}

  useEffect(function() {
    if (coinData.length === 0){
      componentDidMount();
    }
  });


  return (
    <Div>
      <ExchangeHeader />
      <CoinList coinData={coinData} />
    </Div>
  );
  
}

export default App;
