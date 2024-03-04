from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email


class Listing:
    def __init__(self, name=None, location=None, time=None, duration=None, price=None, description=None, username=None):
        if name:
            self.name = name
        if location:
            self.location = location
        if time:
            self.time = time
        if duration:
            self.duration = duration
        if price:
            self.price = price
        if description:
            self.description = description
        if username:
            self.username = username


class Database:
    def __init__(self, db_pswd):
        uri = f"mongodb+srv://cs35L:{db_pswd}@linewaiter.uoiweiz.mongodb.net/?retryWrites=true&w=majority&appName=LineWaiter"
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        self.db = self.client['linewaiter']
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print("db.py initialization error")
            print(e)

    def add_user(self, user: User):
        return self.db.users.insert_one(vars(user)).inserted_id

    def get_user(self, username: str):
        return User(**self.db.users.find_one({"username": username}))

    def add_listing(self, listing: Listing):
        return self.db.listings.insert_one(vars(listing)).inserted_id

    def get_listings(self, query: Listing):
        all_listings = []
        for listing in self.db.listings.find(vars(query)):
            all_listings.append(Listing(**listing))
        return all_listings

    def get_all_listings(self):
        all_listings = []
        for listing in self.db.listings.find():
            all_listings.append(Listing(**listing))
        return all_listings



