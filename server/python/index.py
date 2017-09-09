from flask import Flask, flash, redirect, render_template, request, session, abort
from random import randint 
import json
import schedule
import time
import pandas as pd
import numpy as np
from fbprophet import Prophet
import quandl
import matplotlib.pyplot as plt
import litecoinQuandl3
import bitcoinQuandl

app = Flask(__name__)
 
@app.route("/python/", methods=['GET', 'POST'])
def parse_data():
    result = {'message': 'Hello World!'}
    return json.dumps(result)
 
if __name__ == "__main__":
    app.run()

def job():
    litecoinQuandl3.getLitecoinData()
    bitcoinQuandl.getBitcoinData()

# schedule.every().day.at("5:30").do(job)
# while True:
#     schedule.run_pending()
#     time.sleep(1)

job()