const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('user', {
  handle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Prediction = db.define('prediction', {
  currency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prediction: {
    type: Sequelize.TEXT,
    allowNull: false
  },
}, {
  timestamps: false
});

const historicalGraphData = db.define(`historical_graph`, {
  currency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  }
});

////////////////// THIS SHOULD HAVE ALL THE STOCK INFORMATION, BUT PortfolioStock has the info for an individual's holdings//////


const Portfolio = db.define('portfolio', {
  name: {
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 100000
  }
});

const PortfolioStock = db.define('portfolio_stock', {
  shares: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  buyPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const PortfolioHistory = db.define('portfolio_history', {
  portfolio_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  balance: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  entry_date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

const TransactionHistory = db.define('transaction_history', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  transactionPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  transactionType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  transactionTotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {timestamps: false});

const dailyBalance = db.define('daily_balance', {
  liquid: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  currencies: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

PortfolioStock.belongsTo(Portfolio, {onDelete: 'CASCADE'});
Portfolio.hasMany(PortfolioStock, {onDelete: 'CASCADE'});

TransactionHistory.belongsTo(Portfolio, {onDelete: 'CASCADE'});
Portfolio.hasMany(TransactionHistory, {onDelete: 'CASCADE'});

dailyBalance.belongsTo(Portfolio, {onDelete: 'CASCADE'});
Portfolio.hasMany(dailyBalance, {onDelete: 'CASCADE'})

Portfolio.belongsTo(User, {onDelete: 'CASCADE'});
User.hasMany(Portfolio, {onDelete: 'CASCADE'});



User.sync();
// Stock.sync();
historicalGraphData.sync();
TransactionHistory.sync();
Portfolio.sync();
PortfolioHistory.sync();
PortfolioStock.sync();
Prediction.sync();

module.exports = {
  User,
  Portfolio,
  PortfolioHistory,
  PortfolioStock,
  TransactionHistory,
  dailyBalance,
  historicalGraphData,
  Prediction
}



