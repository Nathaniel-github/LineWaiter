from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId


class User:
    def __init__(self, username, password, accepted_listings=None):
        self.username = username
        self.password = password
        self.accepted_listings = accepted_listings

    def accept_listing(self,listing_id):
        self.accepted_listings.append(listing_id)


class Listing:
    def __init__(self, name=None, location=None, time=None, duration=None, price=None, description=None, username=None, user_accepted=None, bids=None, ready=None):
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
        if user_accepted:
            self.user_accepted = user_accepted
        if bids:
            self.bids = bids
        if ready:
            self.ready = ready


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
        if self.db.users.find_one({"username": user.username}) is not None:
            return False
        else:
            self.db.users.insert_one(vars(user))
            return True

    def get_user(self, username: str):
        user = self.db.users.find_one({"username": username})
        try:
            if user is not None:
                del user['_id']
                return User(**user)
            else:
                return None
        except Exception as e:
            print(f"Error getting user: {str(e)}")
            return None

    def add_listing(self, listing: Listing):
        return self.db.listings.insert_one(vars(listing)).inserted_id

    def get_listings(self, query: Listing):
        all_listings = []
        for listing in self.db.listings.find(vars(query)):
            listing['_id'] = str(listing['_id'])
            if 'user_accepted' not in listing:
                listing['user_accepted'] = ""
            all_listings.append(listing)
        return all_listings

    def get_all_listings(self):
        all_listings = []
        for listing in self.db.listings.find():
            listing['_id'] = str(listing['_id'])
            if 'user_accepted' not in listing:
                listing['user_accepted'] = ""
            all_listings.append(listing)
        return all_listings

    def delete_listing(self, _id):
        return self.db.listings.delete_one({"_id": ObjectId(_id)})

    def accept_listing(self, username, listing_id):
        return self.db.listings.update_one({"_id": ObjectId(listing_id)}, {"$set": {"user_accepted": username}}).modified_count > 0

    def add_bid(self, listing_id, bid):
        return self.db.listings.update_one({"_id": ObjectId(listing_id)}, {"$push": {"bids": bid}}).modified_count > 0

    def ready_listing(self, listing_id):
        return self.db.listings.update_one({"_id": ObjectId(listing_id)}, {"$set": {"ready": True}}).modified_count > 0
