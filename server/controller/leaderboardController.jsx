const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js');

module.exports ={
    weeklyTopPortfolioBalances: (req, res) => {
        Redis.lrange('weeklyTopPortfolioBalances', 0, -1, (err, data) => {
            if(data){   
            } else {
            }
        })
    },
    dailyTopPortfoliosBalances: (req, res) => {

    },
    currentTopPortfoliosBalances: (req, res) => {

    },
    

}