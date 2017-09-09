const db = require('./database/models/model.js');
const axios = require('axios');

db.User.sync({force: true})
.then(() => db.Portfolio.sync({force: true}))
.then(() => db.Prediction.sync({force: true}))
.then(() => db.historicalGraphData.sync({force:true}))
.then(() => db.dailyBalance.sync({force:true}))
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
    return db.Prediction.bulkCreate([
            {currency: 'btc', prediction: JSON.stringify([['2017-09-06', 81.04702180045653],
                                            ['2017-09-07', 80.7275502815173],
                                            ['2017-09-08', 80.3609728322542],
                                            ['2017-09-09', 79.94666907579816],
                                            ['2017-09-10', 79.36621113392505],
                                            ['2017-09-11', 78.8923964729993],
                                            ['2017-09-12', 78.46459826247282],
                                            ['2017-09-13', 77.5551924912713],
                                            ['2017-09-14', 76.97941275242539],
                                            ['2017-09-15', 76.46234902429386],
                                            ['2017-09-16', 76.00299705373375],
                                            ['2017-09-17', 75.48030396606988],
                                            ['2017-09-18', 75.16229354103976],
                                            ['2017-09-19', 74.98155927273953],
                                            ['2017-09-20', 74.40188049406143],
                                            ['2017-09-21', 74.22830736502766],
                                            ['2017-09-22', 74.17442493578133],
                                            ['2017-09-23', 74.22669593068441],
                                            ['2017-09-24', 74.25082026459368],
                                            ['2017-09-25', 74.50118666450105],
                                            ['2017-09-26', 74.89669620959175],
                                            ['2017-09-27', 74.88770474433082],
                                            ['2017-09-28', 75.2664218343325],
                                            ['2017-09-29', 75.73446875254284],
                                            ['2017-09-30', 76.26748802329578],
                                            ['2017-10-01', 76.72173620085545],
                                            ['2017-10-02', 77.34372986360593],
                                            ['2017-10-03', 78.04622031861547],
                                            ['2017-10-04', 78.27524082837161],
                                            ['2017-10-05', 78.82056213147446]])}
    ])
})
.catch(err => console.log('Prediction seed unsuccessful', err))
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