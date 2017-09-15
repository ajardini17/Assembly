const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');
const chunk = require('lodash.chunk');

module.exports = {
  
  fetchLeaderboard: (req, res) => {
    let counter = req.query.leaderboard.length;
    const responseObj = {};
    req.query.leaderboard.forEach((board,i) => Redis.zrevrange(board, 0, -1, 'withscores', (err, data) => {
      if(data){
        const leaderboard = chunk(data,2);
        Promise.all(leaderboard.map(x => new Promise((resolve, reject) => {
          const element = {};
          Model.Portfolio.findOne({where: {id:x[0]}})
          .then(portfolio => {
            Model.User.findOne({where: {id: portfolio.dataValues.userId}})
            .then(user => {
              element.username = user.dataValues.handle;
              element.portfolioName = portfolio.dataValues.name;
              element.portfolioValue = Math.round(x[1] * 100) / 100;
              element.portfolioId = portfolio.dataValues.id;
              resolve(element);
            })
          })
        })
      ))
      .then(totalLeaderboard => {
        counter--;
        responseObj[board] = totalLeaderboard;
        if(!counter){
          res.json(responseObj)
        }
      })

      } else {
        counter--;
        responseObj[board] = [];
        if(!counter){
          res.json(responseObj)
        }
      }
   }))
  
  }

}