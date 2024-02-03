from flask import Flask, g, render_template, request, url_for, redirect

import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

#def hello_world():  # put application's code here
    #return 'Hello World!'

@app.route('/ask/', methods=['POST', 'GET'])
def ask():
    if request.method == 'GET':
        return render_template('mainListings.html')
    else:
        try:
            return render_template('mainListings.html', name=request.form['name'], request=request.form['request'])
        except:
            return render_template('mainListings.html')

@app.route('/yourlistings/')
def your_listings():
    return render_template('yourListings.html')

@app.route('/myListings/', methods=['POST', 'GET'])
linewaiter.createCollection("listings")
def my_listings():
    if request.method == 'GET':
        return render_template('yourListings.html')
    else:
        try: 
            return render_template('yourListings.html', where=request.form['where'], when=request.form['when'], 
                                  length=request.form['length'], price=request.form['price'])
        except:
            return render_template('yourListings.html')
    return render_template('yourListings.html')


if __name__ == '__main__':
    load_dotenv(".env")
    DB_PSWD = os.getenv("DB_PSWD")
    uri = f"mongodb+srv://cs35L:{DB_PSWD}@linewaiter.uoiweiz.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    app.run()
