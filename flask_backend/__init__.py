from flask import Flask
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

from flask_backend.resources import RESTDataset, RESTDatasetCollection

api.add_resource(RESTDataset, "/backend/dataset")
api.add_resource(RESTDatasetCollection, "/backend/collection")

from flask_backend import routes
