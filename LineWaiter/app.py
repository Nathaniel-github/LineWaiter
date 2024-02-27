from flask import Flask, g, render_template, request, url_for, redirect

import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

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


@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query')
    restaurant_filter = request.form.get('restaurant_filter')
    # Filter the search based on the selected restaurant option
    if restaurant_filter:
        # Perform the search with the filter option
        results = db.listings.find({
            "name": {"$regex": query, "$options": "i"},
            "Restaurant": restaurant_filter
        })
    else:
        # Perform the search without the filter option
        results = db.listings.find({
            "name": {"$regex": query, "$options": "i"}
        })
    return render_template('search_results.html', results=results)

@app.route('/add_restaurant_options')
def add_restaurant_options():
    db.tags.update_one(
        {"name": "Restaurant"},
        {"$set": {"options": ["BCafe", "BPlate", "Epic At Ackerman", "FEAST", "Food Trucks", "Epicuria", "The Drey", "The Study", "Rendezvous East", "Rendezvous West", "De Neve"]}},
        upsert=True
    )
    return "Restaurant search options added successfully!"

@app.route('/addListings/', methods=['POST', 'GET'])
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
    load_dotenv("..env")
    DB_PSWD = os.getenv("DB_PSWD")
    uri = f"mongodb+srv://cs35L:{DB_PSWD}@linewaiter.uoiweiz.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client['line-waiter']
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    app.run()
