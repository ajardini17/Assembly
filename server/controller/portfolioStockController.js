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
            console.log('error in getting info from server side :: ', err)
        })
    },
    // ticker: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // stockName: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // shares: {
    //     type: Sequelize.FLOAT,
    //     allowNull: false
    // },
    // sellPrice: {
    //     type: Sequelize.FLOAT,
    //     allowNull: false
    // },
    // transactionType: {
    //     type: string
    // }
    addStock: (req, res) => {

        Model.PortfolioStock.create({
            portfolioId: req.body.portfolioId,
            buyPrice: req.body.buyPrice,
            shares: req.body.shares,
            ticker: req.body.ticker,
            stockName: req.body.stockName
        })
        .then(stock => {
            let amount = req.body.shares * req.body.buyPrice;
            db.query(`UPDATE portfolios SET balance = balance - ${amount} WHERE id = ${req.body.portfolioId}`)
            .then(() => {
                Model.TransactionHistory.create({
                    ticker: req.body.ticker,
                    shares: req.body.shares,
                    transactionType: 'buy',
                    transactionPrice: req.body.buyPrice,
                    stockName: req.body.stockName
                })
                .then(() => res.send('stock added'));
            });
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
    sell: (req, res) => {
        let body = req.body;
        let gain = body.shares * body.sellPrice;
        db.query(`UPDATE portfolioStocks SET shares = shares - ${body.shares}`)
        .then(() => {
            db.query(`UPDATE portfolios SET balance = balance + ${gain} WHERE id = ${body.portfolioId}`)
            .then(() => {
                Model.TransactionHistory.create({
                    ticker: body.ticker,
                    shares: req.body.shares,
                    transactionType: 'sell',
                    transactionPrice: body.sellPrice,
                    stockName: body.stockName
                })
                .then(() => res.send('successfully sold!'))
            })
            .catch(() => res.send('error selling'))
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
                    transactionPrice: req.body.sellPrice,
                    stockName: req.body.stockName
                })
                .then(() => res.send('sucessfully sold'))
            })
        })
    }

}