const router = require('express').Router();

const user = require('../controller/userController.js');
const stock = require('../controller/stockController.js');
const portfolio = require('../controller/portfolioController.js');
const portfolioStock = require('../controller/portfolioStockController.js');

router.get('/coinQuery', portfolioStock.coinQuery);

router.get('/login', user.login);
router.post('/addProfile', user.addProfile);
router.post('/addStock', portfolioStock.addStock);

router.post('/createPortfolio', portfolio.createPortfolio);

module.exports = router;
