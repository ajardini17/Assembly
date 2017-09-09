import pandas as pd
import numpy as np
from fbprophet import Prophet
import quandl
import matplotlib.pyplot as plt
import quandl_key
import requests
import psycopg2
from urllib import parse
import server_key

def getLitecoinData():
  quandl.ApiConfig.api_key = quandl_key.get_quandl_key()
  df = quandl.get("BNC3/GWA_LTC")
  df['y'] = df['Close']
  df['ds'] = df.index

  m = Prophet()
  m.fit(df)

  future = m.make_future_dataframe(periods=20)
  forecast = m.predict(future)
  futureData = forecast[['ds', 'yhat']][-20:]
  futureData['ds'] = futureData['ds'].dt.strftime('%Y-%m-%d')
  futureData = futureData.round(2).to_json()

  # print(futureData)

  parse.uses_netloc.append("postgres")
  url = parse.urlparse(server_key.get_server_key())

  conn = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port

  )
  cur = conn.cursor()
  # cur.execute("DELETE FROM predictions WHERE currency = %s", ('ltc', ))
  # cur.execute("INSERT INTO predictions (currency, prediction) VALUES (%s, %s)", ('ltc', futureData))
  cur.execute("UPDATE predictions SET prediction = %s WHERE currency = %s", (futureData, 'ltc'))
  # cur.execute("SELECT * FROM prediction;")
  # print(cur.fetchall())
  conn.commit()
  cur.close()
  conn.close()



  #m.plot(forecast);
  # m.plot_components(forecast);
  # plt.savefig('static/images/litecoinPred.png', bbox_inches='tight')
  ############################## SEND PREDICTION TO PRED DB TABLE