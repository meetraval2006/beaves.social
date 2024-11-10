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

#get_user() is incomplete. 
def get_user():
    name = db.collection("users").document(random_id).get().to_dict()["name"]
    role = db.collection("users").document(random_id).get().to_dict()["role"]
    email = db.collection("users").document(random_id).get().to_dict()["email"]
    user_info = {name, role, email}
    return user_info

create_user()

if __name__ == "__main__":
    app.run(debug=True)