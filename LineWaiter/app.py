from flask import Flask, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

from db import Listing, Database, User


app = Flask(__name__)
CORS(app)
load_dotenv(".env")
DB_PSWD = os.getenv("DB_PSWD")
database = Database(DB_PSWD)

@app.route('/login/', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        print(username, password)
        print("reached")
        user = database.get_user(username)
        print("reached2")
        if user.password == password:
            return {"auth": "success"}
        else:
            return {"auth": "failure"}
    except:
        print("error failure")
        return {"auth": "failure"}


@app.route('/createAnAccount/', methods=['POST'])
def create_an_account():
    if database.add_user(User(**request.json)):
        return {"status": "success"}
    else:
        return {"status": "failure"}


@app.route('/allListings', methods=['GET'])
def get_listings():
    return database.get_all_listings()


@app.route('/search', methods=['POST'])
def search():
    return database.get_listings(Listing(**request.form))


@app.route('/createAListing/', methods=['POST'])
def my_listings():
    try:
        data = request.get_json()
        print("Received Data:", data)
        listing_id = database.add_listing(Listing(**data))
        return jsonify({"status": "success", "listing_id": str(listing_id)})

    except Exception as e:
        print(f"Error adding listing: {str(e)}")
        return jsonify({"status": "success", "listing_id": str(listing_id)})



if __name__ == '__main__':
    app.run()
