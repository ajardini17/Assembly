const db = require('./database/models/model.js');
const axios = require('axios');

db.User.sync({force: true})
.then(() => db.Portfolio.sync({force: true}))
.then(() => db.historicalGraphData.sync({force:true}))
.then(() => db.TransactionHistory.sync({force: true}))
.then(() => db.PortfolioStock.sync({force: true}))
.then(() => db.PortfolioHistory.sync({force: true}))
.then(() => {
    return db.User.bulkCreate([
        {handle: 'test', password: '$2a$10$6s5sHlMf.DhrSRWdlvT/iOjVTF8CvE7SG9O3lggCOCWGV8lUsoGHO'}
    ])
})
.catch(err => console.log('error in bulk create, user'))
.then(() => {
    return db.Portfolio.bulkCreate([
            {name: 'testfolio', userId: 1},
            {name: 'woolfolio', userId: 1},
            {name: 'bobfolio', userId: 1}
    ])
})
.catch(err => console.log('Portfolio seed unsuccessful'))
.then(() => {
    return db.PortfolioHistory.bulkCreate([
            {portfolio_id: 1, balance: 1000000, entry_date: 1503703075000},
            {portfolio_id: 1, balance: 1050000, entry_date: 1503789475000},
            {portfolio_id: 1, balance: 1100000, entry_date: 1503875875000},
            {portfolio_id: 1, balance: 1500000, entry_date: 1503962275000},
            {portfolio_id: 1, balance: 1090000, entry_date: 1504048675000},
            {portfolio_id: 1, balance: 1400000, entry_date: 1504135075000},
            {portfolio_id: 1, balance: 1450000, entry_date: 1504221475000},
            {portfolio_id: 1, balance: 1700000, entry_date: 1504308022190},
            {portfolio_id: 2, balance: 1000000, entry_date: 1503703075000},
            {portfolio_id: 2, balance: 1050000, entry_date: 1503789475000},
            {portfolio_id: 2, balance: 1100000, entry_date: 1503875875000},
            {portfolio_id: 2, balance: 1500000, entry_date: 1503962275000},
            {portfolio_id: 2, balance: 1090000, entry_date: 1504048675000},
            {portfolio_id: 2, balance: 1400000, entry_date: 1504135075000},
            {portfolio_id: 2, balance: 1450000, entry_date: 1504221475000},
            {portfolio_id: 2, balance: 1700000, entry_date: 1504308022190},
            {portfolio_id: 3, balance: 1000000, entry_date: 1503703075000},
            {portfolio_id: 3, balance: 1050000, entry_date: 1503789475000},
            {portfolio_id: 3, balance: 1100000, entry_date: 1503875875000},
            {portfolio_id: 3, balance: 1500000, entry_date: 1503962275000},
            {portfolio_id: 3, balance: 1090000, entry_date: 1504048675000},
            {portfolio_id: 3, balance: 1400000, entry_date: 1504135075000},
            {portfolio_id: 3, balance: 1450000, entry_date: 1504221475000},
            {portfolio_id: 3, balance: 1700000, entry_date: 1504308022190}
    ])
})
.catch(err => console.log('Portfolio seed unsuccessful'))
.then(() => {
    
    return db.PortfolioStock.bulkCreate([
        {portfolioId: 1, shares: 40, buyPrice: 100, ticker: 'btc'},
        {portfolioId: 1, shares: 10, buyPrice: 70, ticker: 'eth'},
        {portfolioId: 2, shares: 1.6, buyPrice: 3100, ticker: 'btc'},
        {portfolioId: 2, shares: 5, buyPrice: 250, ticker: 'eth'}
    ])
    
})
.then(() => {
  const coins = ['btc', 'bch', 'eth', 'ltc', 'xmr', 'xrp', 'zec'];
  let current_time = Math.round((new Date()).getTime() / 1000);
  var counter = coins.length;
  Promise.all(coins.map(coin => axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${coin.toUpperCase()}&tsym=USD&aggregate=1&toTs=${current_time}&allData=true`)))
  .then(results => {
    const coinData = results.map(x=>x.data.Data);
    coinData.forEach((coin,i)=>{
      let historicalData = []
      coinData[i].forEach((data, j) => {
        historicalData.push([coinData[i][j].time * 1000, coinData[i][j].close]);
      });
      //Redis.set(`${coins[i]}:history`, JSON.stringify(historicalData));
      db.historicalGraphData.create({currency: coins[i], data: historicalData})
      .then(() => {
        counter--;
        if(counter === 0){
          console.log(`
          
              SEEDING SUCCESSFUL
          
              `);
              process.exit()
        }
      })
    })
  })
  .catch(err => console.log(err))
})

// .then(() => {
//     console.log(`

//     SEEDING SUCCESSFUL

//     `);
//     process.exit()
// })