const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('user', {
    handle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Stock = db.define('stocks', {
    ticker: {
        type: Sequelize.STRING
    },
    buyPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

const Portfolio = db.define('portfolio', {
    name: {
        type: Sequelize.STRING,
    }
});

const PortfolioStock = db.define('portfolio_stock', {

});

Stock.belongsToMany(Portfolio, {through: PortfolioStock});
Portfolio.belongsToMany(Stock, {through: PortfolioStock});
Portfolio.belongsTo(User);

User.sync();
Stock.sync();
Portfolio.sync();
PortfolioStock.sync();

module.exports = {
    User,
    Stock,
    Portfolio,
    PortfolioStock
}



