import sys
import pymongo

from datetime import datetime
from pymongo import MongoClient

# python3 version
#print(sys.version)
# PyMongo version
#print(pymongo.version)

# establish client to connect to cluster
client = MongoClient('mongodb://AdminUser:<password>@testcluster-shard-00-00-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-01-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-02-hatcp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin&retryWrites=true&w=majority')

# create a new database on cluster called testDatabase
db = client.testDatabase

# create new collection in database called people
people = db.people

# specify new document to insert into collection
personDocument = {
  'name': {
      'first': 'Alan',
      'last': 'Turing'
  },
  'birth': datetime(1912, 6, 23),
  'death': datetime(1954, 6, 7),
}

# insert document into collection
people.insert_one(personDocument)

