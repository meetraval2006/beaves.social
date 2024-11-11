import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask
from flask_restful import Api, Resource, reqparse, abort

import uuid

def generate_random_id():
    return str(uuid.uuid4())
random_id = generate_random_id()

app = Flask(__name__)
api = Api(app)

cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred)
db = firestore.client()


def create_user():
    #users = db.collection("users").stream()
    name = input("Enter your name: ")
    pfp = input("Enter a number(place holder for pfp): ")
    role = input("What's your major: ")
    email = input("Enter your OSU email: ")
    doc_ref = db.collection("users").document(random_id).set({"name": name, "pfp": pfp, "role": role, "email": email})
    return doc_ref

def get_user():
    user_ref = db.collection("users")
    docs = user_ref.stream()
    for doc in docs:
        doc_id = doc.id
        user_info = doc.to_dict()
        print(f"User ID: {doc_id} User Info: {user_info}")

create_user()

if __name__ == "__main__":
    app.run(debug=True)