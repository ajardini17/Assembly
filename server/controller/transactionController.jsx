const Model = require('../../database/models/model.js');

module.exports = {

    totalHistory: (req, res) => {
        let query = req.query;
        Model.TransactionHistory
        Model.TransactionHistory.findAll({where: {id: query.token.id}})
        .then(reply => {
        })
    },
    specificHistory: (req, res) => {
        let query = req.query;
    }

}