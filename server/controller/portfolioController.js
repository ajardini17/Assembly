const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js')
module.exports ={
  createPortfolio: (req, res) => {
    Model.Portfolio.create({
      name: req.body.name,
      userId: req.token.id
    })
    .then(portfolio => {
      Redis.hmset(`portfolio:${portfolio.dataValues.id}:hash`, ['liquid', portfolio.dataValues.balance, 'total', portfolio.dataValues.balance]);
      Redis.zadd('leaderboard', portfolio.dataValues.balance, portfolio.dataValues.id);
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
        if(!req.query.simple){
          Redis.zrank('leaderboard', req.query.id, (err, rank) => {
            Redis.zcard('leaderboard', (err, card) => {
              response.portfolioRank = card - rank;
              response.totalPortfolios = card;
              res.send(response);
            })
          });
        } else {
          res.send(response);
        }
      })
    })
  },
  getPortfolioHistory: (req, res) => {
    Model.PortfolioHistory.findAll({where: {portfolio_id: req.query.id}})
    .then(reply => {
      res.send(reply)
    })
  },
  deletePortfolio: (req, res) => {
    Model.Portfolio.destroy({
      where: {id: req.query.portfolioId}
    })
    .then(reply => {
      res.json(reply)
    })
  } 
}

