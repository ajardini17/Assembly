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
    

}

