from flask import Flask, request

import os
from dotenv import load_dotenv

from db import Listing, Database, User


app = Flask(__name__)
load_dotenv(".env")
DB_PSWD = os.getenv("DB_PSWD")
database = Database(DB_PSWD)

@app.route('/login/', methods=['POST'])
def login():
    try:
        username = request.form['username']
        password = request.form['password']
        user = database.get_user(username)
        if user.password == password:
            return {"auth": "success"}
        else:
            return {"auth": "failure"}
    except:
        return {"auth": "failure"}


@app.route('/createAnAccount/', methods=['POST'])
def create_an_account():
    print(request.json)
    database.add_user(User(**request.json))
    return {"status": "success"}


@app.route('/allListings', methods=['GET'])
def get_listings():
    return database.get_all_listings()


@app.route('/search', methods=['POST'])
def search():
    return database.get_listings(Listing(**request.form))


@app.route('/createAListing/', methods=['POST'])
def my_listings():
    database.add_listing(Listing(**request.form))


if __name__ == '__main__':
    app.run()
