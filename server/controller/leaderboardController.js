const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');
const chunk = require('lodash.chunk');

module.exports = {
  weeklyTopPortfolioBalances: (req, res) => {
      
  },
  dailyTopPortfoliosBalances: (req, res) => {

  },
  currentTopPortfoliosBalances: (req, res) => {

  },
  fetchLeaderboard: (req, res) => {
    Redis.zrevrange('leaderboard', 0, -1, 'withscores', (err, data) => {
      const leaderboard = chunk(data,2);
      Promise.all(leaderboard.map(x => new Promise((resolve, reject) => {
        const element = [];
        Model.Portfolio.findOne({where: {id:x[0]}})
        .then(portfolio => {
          Model.User.findOne({where: {id: portfolio.dataValues.userId}})
          .then(user => {
            element.push(user.dataValues.handle);
            element.push(portfolio.dataValues.name);
            element.push(Math.round(x[1] * 100) / 100);
            resolve(element);
          })
        })
      })
    ))
    .then(totalLeaderboard => {
      res.send(totalLeaderboard);
    })
   })
  }

  

}