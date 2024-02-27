from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email


class Listing:
    def __init__(self, name, location, time, duration, price, description):
        self.name = name
        self.location = location
        self.time = time
        self.duration = duration
        self.price = price
        self.description = description


class Database:
    def __init__(self, db_pswd):
        uri = f"mongodb+srv://cs35L:{db_pswd}@linewaiter.uoiweiz.mongodb.net/?retryWrites=true&w=majority"
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        self.db = self.client['linewaiter']
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

    def add_user(self, user: User):
        return self.db.users.insert_one(vars(user)).inserted_id

    def get_user(self, username: str):
        return User(**self.db.users.find_one({"username": username}))

    def add_listing(self, listing: Listing):
        return self.db.listings.insert_one(vars(listing)).inserted_id

    def get_listings(self, query: Listing):
        return self.db.listings.find(vars(query))

    def get_all_listings(self):
        return self.db.listings.find()


