const Sequelize = require('sequelize');
const Model = require('../../database/models/model.js');

module.exports ={
    createPortfolio: (req, res) => {
        Model.Portfolio.create({
            name: req.body.name,
            userId: req.body.userId
        })
        .then(portfolio => {
            res.send(portfolio);
        })
    },
    getSpecificPortfolio: (req, res) => {
        console.log(req.query, 'WHBJWGHRBGFHBJFBHJFBHJFFBHJJBHF')
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
    deletePortfolio: (req, res) => {
        Model.Portfolio.destroy({
            where: {id: req.query.id}
        })
        .then(reply => res.send(reply))
    }
    

}

