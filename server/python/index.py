from flask import Flask, flash, redirect, render_template, request, session, abort
from random import randint 
import json

app = Flask(__name__)
 
@app.route("/python/", methods=['GET', 'POST'])
def parse_data():
    result = {'message': 'Hello World!'}
    return json.dumps(result)
 
if __name__ == "__main__":
    app.run(port=8000)