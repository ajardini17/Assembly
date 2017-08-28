const db = require('./database/models/model.js');

db.User.sync({force: true})
.then(() => db.Portfolio.sync({force: true}))
.then(() => db.PortfolioStock.sync({force: true}))
.then(() => {
    
    return db.User.bulkCreate([
        {handle: 'test', email: 'test@test.com', password: '$2a$10$6s5sHlMf.DhrSRWdlvT/iOjVTF8CvE7SG9O3lggCOCWGV8lUsoGHO'}
    ])
})
.catch(err => console.log('error in bulk create, user'))
.then(() => {
    return db.Portfolio.bulkCreate([
            {name: 'testfolio', userId: 1},
            {name: 'woolfolio', userId: 1}
    ])
})
.catch(err => console.log('Portfolio seed unsuccessful'))
.then(() => {
    
    return db.PortfolioStock.bulkCreate([
        {portfolioId: 1, shares: 40, buyPrice: 100, ticker: 'btc', stockName: 'bitcoin'},
        {portfolioId: 1, shares: 10, buyPrice: 70, ticker: 'eth', stockName: 'ethereum'},
        {portfolioId: 2, shares: 1.6, buyPrice: 3100, ticker: 'btc', stockName: 'bitcoin'},
        {portfolioId: 2, shares: 5, buyPrice: 250, ticker: 'eth', stockName: 'ethereum'}
    ])
    
})
.then(() => {
    console.log(`

    SEEDING SUCCESSFUL

    `);
    process.exit()
})