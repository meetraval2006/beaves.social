import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask
from flask_restful import Api, Resource, reqparse, abort

app = Flask(__name__)
api = Api(app)

cred = credentials.Certificate('firebase_private.json')
firebase_app = firebase_admin.initialize_app(cred)

db = firestore.client()
users = db.collection("users")

if __name__ == "__main__":
    app.run(debug=True)