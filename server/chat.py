import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort

import uuid
import re


app = Flask(__name__)
api = Api(app)

cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred, {"databaseURL": "https://beavs-social-default-rtdb.firebaseio.com/"})

ref = db.reference()
ref.get()

def create_chat():
    ...

def create_gc():
    ...

def add_messages():
    ...