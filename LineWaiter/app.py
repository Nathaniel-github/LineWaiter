from flask import Flask, request, jsonify, session
from flask_cors import CORS

import os
from dotenv import load_dotenv

from db import Listing, Database, User


app = Flask(__name__)
CORS(app, supports_credentials=True)

#generate secrete key for user
app.secret_key=os.urandom(24)

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
            session['username']=username
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
    print("session username: ",session['username'])
    return database.get_all_listings()


@app.route('/search', methods=['POST'])
def search():
    return database.get_listings(Listing(**request.form))


@app.route('/createAListing/', methods=['POST'])
def create_a_listing():
    try:
        username=session.get('username',None)
        data = request.get_json()
        data['username']=username
        print("Received Data:", data)
        listing_id = database.add_listing(Listing(**data))

        return jsonify({"status": "success", "listing_id": str(listing_id)})

    except Exception as e:
        print(f"Error adding listing: {str(e)}")
        return jsonify({"status": "success", "listing_id": str(listing_id)})



if __name__ == '__main__':
    app.run()
