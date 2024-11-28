import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort

import uuid
import re

import pyrebase

app = Flask(__name__)
api = Api(app)

firebaseConfig ={
  'apiKey': "AIzaSyAlcEh2v1rNxuzqzNfdKXyP1UV3hrm7sQQ",
  'authDomain': "beavs-social.firebaseapp.com",
  'databaseURL': "https://beavs-social-default-rtdb.firebaseio.com",
  'projectId': "beavs-social",
  'storageBucket': "beavs-social.firebasestorage.app",
  'messagingSenderId': "972710406163",
  'appId': "1:972710406163:web:75e6f84a6b56a7566e37e6",
  'measurementId': "G-EWCP2VX0W3"
}

#realtime
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

#firestore
cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred)
db2 = firestore.client()

def get_user_from_firestore_database():
   ...

# def store_messages():
#     chat_name = input("Enter name of the chat")
#     chat_users = get_user_from_firestore_database()
#     data = {}

if __name__ == "__main__":
    app.run(debug=True)