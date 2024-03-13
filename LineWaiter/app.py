
from flask import Flask, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

from db import Listing, Database, User


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = os.urandom(24)

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
    try:
        if database.add_user(User(**request.json)):
            print("success")
            return {"status": "success"}
        else:
            print("failure")
            return {"status": "failure"}
    except KeyError:
        return {"status": "failure", "message": "Username or password not provided."}



@app.route('/allListings', methods=['GET'])
def get_listings():
    return database.get_all_listings()


@app.route('/search', methods=['POST'])
def search():
    return database.get_listings(Listing(**request.form))


@app.route('/createAListing/', methods=['POST'])
def create_a_listing():
    try:
        data = request.get_json()
        print("Received Data:", data)
        listing_id = database.add_listing(Listing(**data))

        return jsonify({"status": "success", "listing_id": str(listing_id)})

    except Exception as e:
        print(f"Error adding listing: {str(e)}")
        return jsonify({"status": "success", "listing_id": str(listing_id)})

@app.route('/deleteAListing/', methods=['POST'])
def delete_a_listing():
    try:
        _id = request.json.get('_id')
        deleted = database.delete_listing(_id)

        if deleted:
            return {"status": "success"}
        else:
            return {"status": "failure", "message": "Listing not found or unable to delete."}

    except Exception as e:
        return {"status": "failure", "message": str(e)}

@app.route('/acceptListing/', methods=['POST'])
def accept_listing():
    try:
        username = request.json.get('username')
        listing_id = request.json.get('_id')

        accepted = database.accept_listing(username, listing_id)

        print(username)
        print(listing_id)
        print(username, listing_id)

        if accepted:
            return {"status": "success"}
        else:
            print("actual failure", str(accepted))
            return {"status": "failure", "message": "Listing not found or unable to accept."}

    except Exception as e:
        print("failure due to error")
        return {"status": "failure", "message": str(e)}


if __name__ == '__main__':
    app.run()
