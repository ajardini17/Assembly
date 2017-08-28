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

    for url in urls:
        print('NEW URL :::::: ', url)
        with requests.Session() as s:
            download = s.get(url)

            decoded_content = json.loads(download.content.decode('utf-8'))
            decoded_content = decoded_content['Data']
            new_decoded_content = json.dumps(decoded_content)

            cr = csv.reader(new_decoded_content.splitlines(), delimiter=',')
            my_list = list(cr)
            for row in my_list:
                print(row)

get_historical_cc_data()