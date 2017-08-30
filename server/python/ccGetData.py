import bs4 as bs
import datetime as dt
import os
import pandas as pd
import pandas_datareader.data as web
import pickle
import requests
import matplotlib.pyplot as plt
from matplotlib import style
import numpy as np
import csv
import json
import time

style.use('ggplot')

current_time = int(time.time())

urls = ['https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=BCH&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=XMR&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time),
        'https://min-api.cryptocompare.com/data/histoday?fsym=ZEC&tsym=USD&aggregate=1&toTs={}&allData=true'.format(current_time)]

def get_historical_cc_data():
    if not os.path.exists('cc_dfs'):
        os.mkdir('cc_dfs')
    count = 0
    for url in urls:
        print('NEW URL :::::: ', url)
        with requests.Session() as s:
            download = s.get(url)

            decoded_content = json.loads(download.content.decode('utf-8'))
            decoded_content = decoded_content['Data']
            new_decoded_content = json.dumps(decoded_content)

            newCsv = open('cc_dfs/history{}.csv'.format(url[53:56]), 'w+')
            count += 1
            cr = csv.writer(newCsv, new_decoded_content.splitlines(), delimiter=',')
            header = decoded_content[0].keys()
            cr.writerow(header)
            for section in decoded_content:
                print(section)
                cr.writerow(section.values())

# get_historical_cc_data()

def compile_closes_data():
    main_df = pd.DataFrame()
    for url in urls:
        try:
            df = pd.read_csv('cc_dfs/history{}.csv'.format(url[53:56]))
            df.set_index('time', inplace=True)

            df.rename(columns = {'close': url[53:56]}, inplace=True)
            df.drop(['high', 'low', 'open', 'volumefrom', 'volumeto'], 1, inplace=True)

            if main_df.empty:
                main_df = df
            else:
                main_df = main_df.join(df, how='outer')
        except:
            print('failed to compile ticker : ', url[53:56])

    main_df.to_csv('crypto_history_joined_closes.csv')

compile_closes_data()

def visualize_data():
    df = pd.read_csv('cc_dfs/historyBTC.csv')
    df['close'].plot()
    plt.show()

# visualize_data()