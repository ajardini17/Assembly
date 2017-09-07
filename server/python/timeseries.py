import os
import inline as inline
import numpy as np
import pandas as pd
import pandas_datareader.data as web
import seaborn as sns
import matplotlib.pyplot as plt
import quandl
import statsmodels.formula.api as smf
import statsmodels.tsa.api as smt
import statsmodels.api as sm
from collections import namedtuple
ADF = namedtuple("ADF", "adf pvalue usedlag nobs critical icbest")
sns.set(style='ticks', context='talk')
quandl.ApiConfig.api_key = 'q7sFrqy9HwanRCz14dVq'
if int(os.environ.get("MODERN_PANDAS_EPUB", 0)):
    import prep # noqa
df = web.DataReader('BNC3/GWA_LTC', 'quandl', start='2014-05-01')
df['PCT_change'] = (df['Close'] - df['Open']) / df['Open'] * 100.0
df['HL_PCT'] = (df['High'] - df['Low']) / df['Close'] * 100.0
df = df[['Close', 'HL_PCT', 'PCT_change', 'Volume']]
df.dropna(inplace=True)
y = df['Close']
X = (pd.concat([y.shift(i) for i in range(6)], axis=1,
               keys=['y'] + ['L%s' % i for i in range(1, 6)])
       .dropna())
X.head()
mod_lagged = smf.ols('y ~ trend + L1 + L2 + L3 + L4 + L5',
                     data=X.assign(trend=np.arange(len(X))))
res_lagged = mod_lagged.fit()
mod_trend = sm.OLS.from_formula(
    'y ~ trend', data=y.to_frame(name='y')
                       .assign(trend=np.arange(len(y))))
res_trend = mod_trend.fit()
def tsplot(y, lags=None, figsize=(10, 8)):
    fig = plt.figure(figsize=figsize)
    layout = (2, 2)
    ts_ax = plt.subplot2grid(layout, (0, 0), colspan=2)
    acf_ax = plt.subplot2grid(layout, (1, 0))
    pacf_ax = plt.subplot2grid(layout, (1, 1))
    y.plot(ax=ts_ax)
    smt.graphics.plot_acf(y, lags=lags, ax=acf_ax)
    smt.graphics.plot_pacf(y, lags=lags, ax=pacf_ax)
    [ax.set_xlim(1.5) for ax in [acf_ax, pacf_ax]]
    sns.despine()
    plt.tight_layout()
    plt.show()
    return ts_ax, acf_ax, pacf_ax
print(ADF(*smt.adfuller(y.diff().dropna()))._asdict())
data = (y.to_frame(name='y')
         .assign(Δy=lambda df: df.y.diff())
         .assign(LΔy=lambda df: df.Δy.shift()))
mod_stationary = smf.ols('Δy ~ LΔy', data=data.dropna())
res_stationary = mod_stationary.fit()
mod = smt.SARIMAX(y, trend='c', order=(1, 1, 1), enforce_stationarity=False, enforce_invertibility=False)
res = mod.fit(maxiter=500)
mod_seasonal = smt.SARIMAX(y, trend='c',
                           order=(1, 1, 2), seasonal_order=(0, 1, 2, 12),
                           simple_differencing=False)
res_seasonal = mod_seasonal.fit(maxiter=100)
# pred = res_seasonal.get_prediction(end='2014-05-01')
# pred_ci = pred.conf_int()
#
# ax = y.plot(label='observed_1')
# pred.predicted_mean.plot(ax=ax, label='Forecast_1', alpha=.7)
# ax.fill_between(pred_ci.index,
#                 pred_ci.iloc[:, 0],
#                 pred_ci.iloc[:, 1], color='k', alpha=.2)
# ax.set_ylabel("Closing Price")
# plt.legend()
# sns.despine()
pred_dy = res_seasonal.get_prediction(start='2017-09-06', dynamic='2017-01-01')
pred_dy_ci = pred_dy.conf_int()
ax = y.plot(label='observed_2')
pred_dy.predicted_mean.plot(ax=ax, label='Forecast_2')
ax.fill_between(pred_dy_ci.index,
                pred_dy_ci.iloc[:, 0],
                pred_dy_ci.iloc[:, 1], color='k', alpha=.25)
ax.set_ylabel("Closing Price")
# Highlight the forecast area
ax.fill_betweenx(ax.get_ylim(), pd.Timestamp('2014-05-01'), y.index[-1],
                 alpha=.1, zorder=-1)
ax.annotate('Dynamic $\\longrightarrow$', (pd.Timestamp('2014-05-01'), 550))
plt.legend()
sns.despine()
plt.show()