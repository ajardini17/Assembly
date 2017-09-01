const Sequelize = require('sequelize');
const Model = require('../../database/models/model.js');

module.exports ={
    createPortfolio: (req, res) => {
        Model.Portfolio.create({
            name: req.body.name,
            userId: req.token.id
        })
        .then(portfolio => {
            res.send(portfolio);
        })
    },
    getSpecificPortfolio: (req, res) => {
        Model.Portfolio.findOne({where: {id: req.query.id}})
        .then(reply => {
            Model.PortfolioStock.findAll({where: {portfolioId: reply.dataValues.id}})
            .then(stocksData => {
                let stocks = stocksData.map(x => x.dataValues);
                let response = reply.dataValues;
                response.stocks = stocks;
                res.send(response);
            })
        })
    },
    getPortfolioHistory: (req, res) => {
        Model.PortfolioHistory.findAll({where: {id: req.query.id}})
        .then(reply => {
            res.send(reply.data)
        })
    },
    deletePortfolio: (req, res) => {
        Model.Portfolio.destroy({
            where: {id: req.query.id}
        })
        .then(reply => res.send(reply))
    }
    

}

