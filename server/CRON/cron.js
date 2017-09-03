const CronJob = require('cron').CronJob;
const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');
const axios = require('axios');
const coins = ['btc', 'bch', 'eth', 'ltc', 'xmr', 'xrp', 'zec'];
let bool = true;


const coinSet = () => {
  axios.all(coins.map((coin, i) => axios.get(`https://api.bitfinex.com/v1/pubticker/${coin}usd`)))
  .then(axios.spread(function(...resp){
    resp.map(x => x.data).forEach((coin, i) => Redis.set(`${coins[i]}-price`, coin.last_price));  
    if(bool){
      getHistoricalData.start();
      collectDailyPortfolioData.start();
      bool = false;
    }

  }));
}

const fetchCoins = () => {
  Promise.all(coins.map(coin =>  new Promise((resolve, reject) =>{Redis.get(`${coin}-price`, (err, data) => {
    resolve(data);
  } )} )))
  .then(reply => {
    var coinObj = {};
    for(var i = 0; i < coins.length; i++){
      coinObj[coins[i]] = reply[i];
    }
    fetchPortfolios(coinObj);
  });
}

const fetchPortfolios = (coins) => {
  Model.Portfolio.findAll({})
  .then(results => {
    const portfolios = results.map(x=>x.dataValues);
    storePortfolioData(coins, portfolios);
  })
}

const storePortfolioData = (coins, portfolios) => {
  portfolios.forEach((portfolio, i) => {
    Model.PortfolioStock.findAll({where:{id:portfolio.id}})
    .then(reply => {
      const stocks = reply.map(x => x.dataValues);
      let currencyValue = 0;
      for(let i = 0; i < stocks.length; i++) {
        currencyValue += (coins[stocks[i].ticker] * stocks[i].shares);
      }
      Model.dailyBalance.create({
        portfolioId: portfolio.id,
        liquid: portfolio.balance,
        currencies: Math.round(currencyValue * 100) / 100
      })
    })
  });
}

const fetchHistory = () => {
  let current_time = Math.round((new Date()).getTime() / 1000);
  Promise.all(coins.map(coin => axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${coin.toUpperCase()}&tsym=USD&aggregate=1&toTs=${current_time}&allData=true`)))
  .then(results => {
    const coinData = results.map(x=>x.data.Data);
    coinData.forEach((coin,i)=>{
      let historicalData = []
      coinData[i].forEach((data, j) => {
        historicalData.push([coinData[i][j].time * 1000, coinData[i][j].close]);
      });
      Redis.set(`${coins[i]}-history`, JSON.stringify(historicalData));
    })
  })
  .catch(err => console.log(err))
}

const getCoinsData = new CronJob({cronTime:'*/60 * * * * *', onTick: () => {coinSet()}, start: false,timeZone:'America/Los_Angeles', runOnInit: true});
const collectDailyPortfolioData = new CronJob({cronTime:'00 30 23 * * *', onTick: () => {fetchCoins()}, start: false, timeZone:'America/Los_Angeles'});
const getHistoricalData = new CronJob({cronTime: '*/60 * * * * *', onTick: ()=>{fetchHistory()}, start: false, timeZone:'America/Los_Angeles', runOnInit: true});
// const weeklyLeaderoard = new CronJob({cronTime: ''});
// const dailyLeaderboard = new CronJob({cronTime: '', onTick: ()=>{}, });

getCoinsData.start();
collectDailyPortfolioData.start();
getHistoricalData.start();



