import firebase_admin
from firebase_admin import db as firebase_db, credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse, abort

import uuid
import re

app = Flask(__name__)
CORS(app)
api = Api(app)

cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred, {"databaseURL": "https://beavs-social-default-rtdb.firebaseio.com/"})
db = firestore.client()

ref = firebase_db.reference('/')
data = ref.get()

keys = []
for key in data.keys():
    keys.append(key)

print(keys)