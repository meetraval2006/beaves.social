import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask
from flask_restful import Api, Resource, reqparse, abort

app = Flask(__name__)
api = Api(app)

cred = credentials.Certificate('./server/service_account_key.json')
firebase_app = firebase_admin.initialize_app(cred)

db = firestore.client()
users = db.collection("users").stream()
next_id = f"{int([doc.id for doc in users][-1]) + 1}"

name = input("Enter your name: ")
pfp = input("Enter a number for pfp(place holder): ")
role = input("What's your major: ")

doc_ref = db.collection("users").document(next_id).set({"name": name, "pfp": pfp, "role": role})

if __name__ == "__main__":
    app.run(debug=True)