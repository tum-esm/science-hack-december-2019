import sys
import pymongo

from pymongo import MongoClient

# python3 version
#print(sys.version)
# PyMongo version
#print(pymongo.version)

client = MongoClient('mongodb://AdminUser:<password>@testcluster-shard-00-00-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-01-hatcp.gcp.mongodb.net:27017,testcluster-shard-00-02-hatcp.gcp.mongodb.net:27017/test?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin&retryWrites=true&w=majority')

