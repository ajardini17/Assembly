const router = require('express').Router();

const user = require('../controller/userController.js');
const stock = require('../controller/stockController.js');
const portfolio = require('../controller/portfolioController.js');


router.get('/coinQuery', stock.coinQuery);

router.get('/login', user.login);
router.post('/addProfile', user.addProfile);

module.exports = router;
