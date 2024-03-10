from flask import Flask, render_template, request, jsonify

import os
from dotenv import load_dotenv
import re

from db import Listing, Database, User


app = Flask(__name__)
load_dotenv(".env")
DB_PSWD = os.getenv("DB_PSWD")
database = Database(DB_PSWD)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/login/', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
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

@app.route('/ask/', methods=['POST', 'GET'])
def ask():
    if request.method == 'GET':
        return render_template('mainListings.html')
    else:
        try:
            return render_template('mainListings.html', name=request.form['name'], request=request.form['request'])
        except:
            return render_template('mainListings.html')

@app.route('/allUserlistings/')
def allUserlistings():
    return render_template('allUserListings.html')

@app.route('/createAnAccount/', methods=['POST', 'GET'])
def create_an_account():
    if request.method == 'GET':
        return render_template('createAnAccount.html')
    else:
        database.add_user(User(**request.form))

#
# #!!!!!this is still in the works!!!!!!!
# #adding user input for listing into database
# @app.route('/listing_form', methods=['GET', 'POST'])
# def listing_form():
#     if request.method == 'POST':
#         # Process the form data when the form is submitted
#         name=request.form.get('name')
#         location = request.form.get('where')
#         time = request.form.get('when')
#         length = request.form.get('length')
#         price = request.form.get('price')
#         description=request.form.get('description')
#
# #create a listing instance with form data
#         new_listing=Listing(
#             name=name,
#             location=location,
#             time=time,
#             duration=length,
#             price=price,
#             description=description
#         )
#         #need to add database password to enable adding a new listing
#         listing_id=database.add_listing(new_listing)
#
@app.route('/allListings')
def get_listings():
    return database.get_all_listings()
@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query')
    restaurant_filter = request.form.get('restaurant_filter')
    # Filter the search based on the selected restaurant option
    if restaurant_filter:
        database.get_listings(Listing())
        # Perform the search with the filter option
        results = database.listings.find({
            "name": {"$regex": query, "$options": "i"},
            "Restaurant": restaurant_filter
        })
    else:
        # Perform the search without the filter option
        results = database.listings.find({
            "name": {"$regex": query, "$options": "i"}
        })
    return render_template('search_results.html', results=results)

@app.route('/add_restaurant_options')
def add_restaurant_options():
    database.tags.update_one(
        {"name": "Restaurant"},
        {"$set": {"options": ["BCafe", "BPlate", "Epic At Ackerman", "FEAST", "Food Trucks", "Epicuria", "The Drey", "The Study", "Rendezvous East", "Rendezvous West", "De Neve"]}},
        upsert=True
    )
    return "Restaurant search options added successfully!"

@app.route('/createAListing/', methods=['POST', 'GET'])
def my_listings():
    if request.method == 'GET':
        return render_template('createAListing.html')
    else:
        name = request.form['name']
        location = request.form['location']
        time = request.form['time']
        duration = request.form['duration']
        price = request.form['price']
        description = request.form['description']

        # Server-side validation
        if not (name.isalpha() and location.isalpha() and description.isalpha()):
            return render_template('createAListing.html', error="Name, Location, and Description must contain at least one alphabetical character")
        if not time:
            return render_template('createAListing.html', error="Time cannot be empty")
        if not duration.isdigit():
            return render_template('createAListing.html', error="Duration cannot be empty")
        if not price.isdigit():
            return render_template('createAListing.html', error="Price cannot be empty")
        try:
            database.add_listing(Listing(**request.form))
            return render_template('createAListing.html', success=True)
        except Exception as e:
            print(e)
            return render_template('createAListing.html', error="An error occurred while adding the listing")


if __name__ == '__main__':
    app.run()
