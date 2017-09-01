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
        console.log('id is:', req.query.id)
        console.log('GET PORT HISTORY INVOKED****')
        Model.PortfolioHistory.findAll({where: {portfolio_id: req.query.id}})
        .then(reply => {
            console.log('REPLY IS', reply)
            res.send(reply)
        })
    },
    deletePortfolio: (req, res) => {
        Model.Portfolio.destroy({
            where: {id: req.query.id}
        })
        .then(reply => res.send(reply))
    }
    

}

