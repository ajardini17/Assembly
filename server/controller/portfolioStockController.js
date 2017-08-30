const Sequelize = require('sequelize');
const Model = require('../../database/models/model.js');
const db = require('../../database/index.js');
const axios = require('axios');

module.exports = {
    coinQuery: (req, res) => {
        axios.get(`https://api.bitfinex.com/v1/pubticker/${req.query[0]}usd`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => {
            console.log('error in getting info from server side :: ',req.query)
        })
    },
    buy: (req, res) => {
        Model.PortfolioStock.findOne({where:{ticker: req.body.ticker, portfolioId: req.body.portfolioId}})
        .then(stockData => {
            if(stockData){
                db.query(`UPDATE portfolio_stocks SET shares = shares + ${req.body.shares} WHERE id = ${stockData.dataValues.id}`)
                .then(() => {
                    db.query(`UPDATE portfolios SET balance = balance - ${req.body.finalPrice} WHERE id = ${req.body.portfolioId}`)
                    .then(() => {
                        Model.TransactionHistory.create({
                            ticker: req.body.ticker,
                            shares: req.body.shares,
                            transactionType: 'buy',
                            transactionPrice: req.body.buyPrice,
                            transactionTotal: req.body.finalPrice,
                            portfolioId: req.body.portfolioId
                        })
                        .then(() => {
                            stockData.dataValues.shares = Number(stockData.dataValues.shares) + Number(req.body.shares);
                            res.json(stockData.dataValues)
                        })
                        .catch((err) => console.log(err, 'error'))
                    });
                })
            } else {

                Model.PortfolioStock.create({
                    portfolioId: req.body.portfolioId,
                    buyPrice: req.body.buyPrice,
                    shares: req.body.shares,
                    ticker: req.body.ticker
                })
                .then(stock => {
                    db.query(`UPDATE portfolios SET balance = balance - ${req.body.finalPrice} WHERE id = ${req.body.portfolioId}`)
                    .then(() => {
                        Model.TransactionHistory.create({
                            ticker: req.body.ticker,
                            shares: req.body.shares,
                            transactionType: 'buy',
                            transactionPrice: req.body.buyPrice,
                            transactionTotal: req.body.finalPrice
                        })
                        .then(() => res.json(stock.dataValues));
                    });
                })
            }
        })
        .catch(err => res.status(400).send('Error adding stock to portfolio'))
    },
    getUserData: (req, res) => {
        Model.Portfolio.findAll({
            where: {userId: req.token.id}
        })
        .then(portfolios => {
            Promise.all(portfolios.map(folder => Model.PortfolioStock.findAll({where: {portfolioId: folder.id}})))
            .then(results => {
                let stocks = results.map(x=>x.map(y => y.dataValues));
                let portfolioData = portfolios.map(x => x.dataValues);
                portfolioData.forEach((x,i) => portfolioData[i].stocks = stocks[i])
                res.json(portfolioData);
            })
        })
    },
    ///////////////////////////// SELL ////////////////////////////
    sell: (req, res) => {
        let query = req.query;
        Model.PortfolioStock.findOne({where:{ticker: query.ticker, portfolioId: query.portfolioId}})
        .then(stockData => {
            if(stockData) {
                db.query(`UPDATE portfolio_stocks SET shares = shares - ${query.shares} WHERE id = ${stockData.dataValues.id}`)
                .then(() => {
                    db.query(`UPDATE portfolios SET balance = balance + ${query.finalPrice} WHERE id = ${query.portfolioId}`)
                    .then(() => {
                        Model.TransactionHistory.create({
                            ticker: query.ticker,
                            shares: query.shares,
                            transactionType: 'sell',
                            transactionPrice: query.sellPrice,
                            transactionTotal: query.finalPrice
                        })
                        .then(() => {
                            stockData.dataValues.shares = Number(stockData.dataValues.shares) - Number(req.query.shares);
                            
                            res.json(stockData.dataValues)
                        })
                    })
                    .catch(() => res.send('error selling'))
                })
            } else {
                res.send(`do not own ${query.ticker}`);
            }
            })
    },
    sellAll: (req, res) => {
        Model.PortfolioStock.destroy({
            where: {id: req.body.id}
        })
        .then(() => {
            let gain = req.body.shares * req.body.sellPrice;
            db.query(`update portfolios SET balance = balance + ${gain} WHERE id = ${req.body.portfolioId}`)
            .then(() => {
                Model.TransactionHistory.create({
                    ticker: req.body.ticker,
                    shares: req.body.shares,
                    transactionType: 'sell',
                    transactionPrice: req.body.sellPrice
                })
                .then(() => res.send('sucessfully sold'))
            })
        })
    }

}