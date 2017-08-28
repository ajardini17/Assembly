const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').load();

module.exports = {
    getToken: (id, handle, callback) => {
        let user = {
            handle: handle,
            id: id
        }
        let token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 100
        });
        callback({success: true, token: token});
    },
    authenticate: (req, res, next) => {
        let header = req.headers['authorization'];
        if(header){
            jwt.verify(header, process.env.SECRET_KEY, (err, data) => {
                if(err){
                    res.sendStatus(403);
                } else {
                    next();
                }
            })
        } else {
            res.status(400).send('no token');
        }
    }
}