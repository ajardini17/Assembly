const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js')
const axios = require('axios');

module.exports = {
  getHistoricalData: (req, res) => {
    Redis.get(`${req.query[0]}-history`, (err, data) => {
      res.send(JSON.parse(data));
    })
  }
}

