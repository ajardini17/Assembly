const CronJob = require('cron').CronJob;
const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');
const axios = require('axios');
/*







*/
// redis.set;



const coinSet = () => {
    let coins = ['btc', 'bch', 'eth', 'ltc', 'xmr', 'xrp', 'zec'];
    console.log('coinSet');
    axios.all(coins.map((coin, i) => axios.get(`https://api.bitfinex.com/v1/pubticker/${coin}usd`)))
    .then(axios.spread(function(...resp){
        resp.map(x => x.data).forEach((coin, i) => Redis.set(`${coins[i]}-price`, coin.last_price));
    }));
    // axios.get(`https://api.bitfinex.com/v1/pubticker/${coins[0]}usd`)
    // .then(resp => console.log(resp.data));
}

const collectUserData = () => {
    
};

const calculateCoinData = (coinsArr) => {

};

const collectDailyPortfolioData = new CronJob('00 30 23 * * 1-7', () => {
    let count = 0;
    let coins = ['btc', 'eth', 'ltc', 'xmr', 'xrp', 'zec'].map(function(coin){
        Redis.get(coin, (err, data) => {
            return data;
        })
    });
    
},() => {}, true, 'America/New_York');

const getCoinsData = new CronJob({cronTime:'*/60 * * * * *', onTick: () => {coinSet()}, start: false,timeZone:'America/Los_Angeles', runOnInit: true});

//collectDailyUserData.start();
getCoinsData.start();


// const testCron = new CronJob('* * * * * *', () => {
//     console.log('CRON JOB');
// }, null, true, 'America/Los_Angeles');

// testCron.start();


