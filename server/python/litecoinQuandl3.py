import pandas as pd
import numpy as np
from fbprophet import Prophet
import quandl
import matplotlib.pyplot as plt

def getLitecoinData():
  df = quandl.get("BNC3/GWA_LTC")
  df['y'] = df['High']
  df['ds'] = df.index


  m = Prophet()
  m.fit(df)

  future = m.make_future_dataframe(periods=20)

  forecast = m.predict(future)

  m.plot(forecast);
  # m.plot_components(forecast);
  plt.show()