import sys
import pymongo

from datetime import datetime
from pymongo import MongoClient

# python3 version
#print(sys.version)
# PyMongo version
#print(pymongo.version)

uri = 'mongodb://AdminUser:<password>@testcluster-shard-00-00-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-01-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-02-hatcp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin&retryWrites=true&w=majority'

# establish client to connect to cluster
client = MongoClient(uri)

# get stats about connection
#print(client.stats)

# get list of databases that we have access to
#print(client.list_database_names())

# get/create a new database on cluster
#db = client.sample_geospatial
db = client['sample_geospatial']

# get list of collections in database
#print(db.list_collection_names())

# get/create new collection in database
#cn = db.shipwrecks
cn = db['shipwrecks']

# count documents in collection
print(cn.count_documents({}))
exit()

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

