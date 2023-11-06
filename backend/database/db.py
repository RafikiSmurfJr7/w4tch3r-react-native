from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pprint

# Replace the placeholder with your Atlas connection string
uri = "mongodb://user:pass@localhost:27017/?authMechanism=DEFAULT"

# Set the Stable API version when creating a new client
client = MongoClient(uri)
                          
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client.w4tch3r
    users = db.users
except Exception as e:
    print(e) 

