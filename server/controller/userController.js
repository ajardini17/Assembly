const Model = require('../../database/models/model.js');
const hasher = require('./password.js');
const auth = require('./authenticateController.js');

module.exports = {
    signup: (req, res) => {
        Model.User.findOne({where: {handle: req.body.handle}})
        .then(response => {
            if(!response){
                hasher.generatePassword(req.body.password, hash => {
                    Model.User.create({handle: req.body.handle, password: hash})
                    .then(user => auth.getToken(user.dataValues.id, user.dataValues.handle, res))
                })
            } else {
                res.send('User taken!');
            }
        })
    },
    login: (req, res) => {
        Model.User.findOne({
                where: {handle: req.query.handle}
            })
            .then(user => {
                if(!user){
                    res.send('user doesn\'t exist');
                } else {
                    hasher.comparePassword(req.query.password, user.dataValues.password, (reply) => {
                        if(reply){
                            auth.getToken(user.dataValues.id, user.dataValues.handle, res);
                        } else {
                            res.send('invalid password');
                        }
                    })
                }
            })
            
    }
    // login: (req, res) => {
    //     Model.User.findOne({
    //         where: {handle: req.query.handle}
    //     })
    //     .then(user => {
    //         if(!user){
    //             res.send('user doesn\'t exist');
    //         } else {
    //             hasher.comparePassword(req.query.password, user.dataValues.password, (reply) => {
    //                 if(reply){
    //                     Model.Portfolio.findAll({
    //                         where: {userId: user.dataValues.id}
    //                     })
    //                     .then(portfolios => {
    //                         Promise.all(portfolios.map(folder => Model.PortfolioStock.findAll({where: {portfolioId: folder.id}})))
    //                         .then(results => {
    //                             auth.getToken(user.dataValues.id, user.dataValues.handle, res, results)
    //                         })
    //                     })
    //                 }else {
    //                     res.send('invalid password');
    //                 }
    //             })
    //         }
    //     })
    // }
    

}



