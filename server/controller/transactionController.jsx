const Model = require('../../database/models/model.js');

module.exports = {

  totalHistory: (req, res) => {
    let query = req.query;
    Model.TransactionHistory.findAll({where: {id: query.token.id}})
    .then(reply => {
    })
  },
  portfolioHistory: (req, res) => {
    let query = req.query;
    Model.TransactionHistory.findAll({
      where: {portfolioId: query.portfolioId},
      order: [['createdAt', 'DESC']]
    })
    .then(reply => res.send(reply));
  }

}