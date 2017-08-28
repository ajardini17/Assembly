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
            .then(() => res.send('stock added'));
        })
        .catch(err => res.status(400).send('Error adding stock to portfolio'))
    },
    buyOrSell: (req, res) => {
        //should fetch the up to date price of stock and return the proper amount to user's portfolio
    }

}