const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').load();

module.exports = {
    getToken: (id, handle, res, data) => {
        let user = {
            handle: handle,
            id: id
        }
        let token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 60 * 60
        });
        if(data) {
            res.json({success: true, token: token, data: data})
        } else {
            res.json({success: true, token: token});
        }
    },
    authenticate: (req, res, next) => {
        let header = req.headers['authorization'];
        if(header){
            jwt.verify(header, process.env.SECRET_KEY, (err, data) => {
                console.log(data, "DATATATTATA");
                if(err){
                    res.sendStatus(403);
                } else {
                    req.token = data;
                    next();
                }
            })
        } else {
            res.status(400).send('no token');
        }
    }
}