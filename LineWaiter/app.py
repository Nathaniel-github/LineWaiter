from flask import Flask, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

from db import Listing, Database, User
import smtplib


app = Flask(__name__)
CORS(app, supports_credentials=True)
sender_email = "linewaitercs35l@gmail.com"
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()

app.secret_key = os.urandom(24)

load_dotenv(".env")
database = Database(os.getenv("DB_PSWD"))

server.login(sender_email, os.getenv("EMAIL_PSWD"))


def send_email(receiver_email, subject, message):
    text = f"Subject: {subject}\n\n{message}"
    server.sendmail(sender_email, receiver_email, text)


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


@app.route('/getUser', methods=['POST'])
def get_user():
    print("started")
    username = request.json.get('username')
    print(username)
    print(database.get_user(username))
    return database.get_user(username)


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

        listing = database.get_listing(listing_id)
        user = database.get_user(listing['username'])
        send_email(user['email'], "Your listing has been accepted!", f"Your listing titled {listing['name']} has been accepted by {username}.")

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


@app.route('/unAcceptListing/', methods=['POST'])
def undo_accept_listing():
    try:
        _id = request.json.get('_id')
        print("listing_id", _id)
        undo_accepted = database.undo_accept_listing(_id)

        listing = database.get_listing(_id)
        user = database.get_user(listing['username'])

        send_email(user['email'], "Your accepted listing has been released!", f"Your listing titled {listing['name']} has been unaccepted. Sorry for the inconvenience.")

        if undo_accepted:
            return {"status": "success"}
        else:
            print("Undo failure", str(undo_accepted))
            return {"status": "failure", "message": "Listing not found or unable to undo accept."}
    except Exception as e:
        print("failure due to error")
        return {"status": "failure", "message": str(e)}


@app.route('/placeBid/', methods=['POST'])
def place_bid():
    try:
        listing_id = request.json.get('listing_id')
        username = request.json.get('username')
        bid = request.json.get('bid')

        listing = database.get_listing(listing_id)
        user = database.get_user(listing['username'])
        send_email(user['email'], "You have a new bid!", f"Your listing titled {listing['name']} has a new bid of {bid} from {username}.")

        if database.add_bid(listing_id, username, bid):
            return {"status": "success"}
        else:
            return {"status": "failure", "message": "Listing not found or unable to place bid."}

    except Exception as e:
        return {"status": "failure", "message": str(e)}


@app.route('/readyListing/', methods=['POST'])
def ready_listing():
    try:
        listing_id = request.json.get('listing_id')

        listing = database.get_listing(listing_id)
        user = database.get_user(listing['username'])

        send_email(user['email'], "Your listing is ready!", f"Your listing titled {listing['name']} is ready! Please go meet the waiter at the location you specified in your listing to complete the transaction")

        if database.ready_listing(listing_id):
            return {"status": "success"}
        else:
            return {"status": "failure", "message": "Listing not found or unable to set ready."}

    except Exception as e:
        return {"status": "failure", "message": str(e)}


@app.route('/getLowestBid/', methods=['POST'])
def get_lowest_bid():
    try:
        listing_id = request.json.get('listing_id')

        lowest_bid = database.get_lowest_bid(listing_id)
        if lowest_bid is not None:
            return {"status": "success", "lowest_bid": lowest_bid}
        else:
            return {"status": "failure", "message": "Listing not found or no bids."}

    except Exception as e:
        return {"status": "failure", "message": str(e)}


@app.route('/acceptLowestBid/', methods=['POST'])
def accept_lowest_bid():
    try:
        listing_id = request.json.get('listing_id')

        lowest_bid = database.get_lowest_bid(listing_id)

        listing = database.get_listing(listing_id)
        user = database.get_user(lowest_bid['username'])

        send_email(user['email'], "Your bid has been accepted!", f"Your bid of {lowest_bid['bid']} has been accepted for the listing titled {listing['name']}.")

        if lowest_bid is not None:
            accepted = database.accept_listing(lowest_bid['username'], listing_id)

            if accepted:
                return {"status": "success"}
            else:
                return {"status": "failure", "message": "Listing not found or unable to accept lowest bid."}

        else:
            return {"status": "failure", "message": "Listing not found or no bids."}

    except Exception as e:
        return {"status": "failure", "message": str(e)}


if __name__ == '__main__':
    app.run()
