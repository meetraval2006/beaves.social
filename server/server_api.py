import firebase_admin
from firebase_admin import credentials, firestore
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
firebase_initialization = firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/api/create_user', methods=['POST'])
def create_user():
    #users = db.collection("users").stream()
    try:
        data = request.get_json()
        name = data.get("name")
        #pfp = data.get("pfp")
        username = data.get("username")
        major = data.get("major")
        minor = data.get("minor")
        year = data.get("year")
        residence_hall = data.get("residence_hall")
        email = data.get("email")
        
        if not re.match(r"^[a-zA-Z]+", name):
            print("Invalid name. Please type your full name")
            abort(400, message="Invalid name. Please type your full name")

        if not re.match(r"^[a-zA-Z0-9_$#!.,:><%-=+]+", username):
            print("Invalid username. Please type a valid username")
            abort(400, message="Invalid username. Please type a valid username")

        if not re.match(r"^[a-zA-Z0-9]+@oregonstate.edu", email):
            print("Invalid email. Please type a valid Oregon State email")
            abort(400, message="Invalid email. Please type a valid Oregon State email")

        if not name or not username or not major or not minor or not year or not residence_hall or not email:
            print("Please provide all the information")
            abort(400, message="Please provide all the information")
        
            
        random_id: str = str(uuid.uuid4())
        user_data: dict[str, str] = {
            "name": name, 
            "username": username, 
            "major": major, 
            "minor": minor, 
            "year": year, 
            "residence_hall": residence_hall, 
            "email": email
        }
        
        db.collection("users").document(random_id).set(user_data)
        user_data["id"] = random_id

        return jsonify(user_data)
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, message="Error creating user")

@app.route("/api/get_users", methods=["GET"])
def get_user():
    try:
        email = f'{request.args.get("email")}@oregonstate.edu'
        if not email:
            abort(400, description="Email is required")

        docs = (
            db.collection("users")
            .where(filter=FieldFilter("email", "==", email))
            .get()
        )

        if len(docs) < 1:
            return jsonify({"error": "User not found"})
        
        user_info = docs[0].to_dict()
        return jsonify(user_info)
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user")

@app.route('/api/get_user', methods=['GET'])
def get_users():
    try:
        users_ref = db.collection("users")
        docs = users_ref.stream()
        users = []
        #user_id = []
        for doc in docs:
            user_data = doc.to_dict()
            user_data["id"] = doc.id  # Add the document ID to the dictionary
            users.append(user_data)

            # user_id = users["id"]
            # user_id.to_dict()
        return jsonify(users)
        
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user")

@app.route('/api/get_user_id', methods=['GET'])
def get_user_id():
    try:
        ref = db.collection("users")
        document = ref.stream()
        user_id = []
        for doc in document:
            user_id.append({"name": doc.to_dict()["name"], "id": doc.id})
        return jsonify(user_id)
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user id")

if __name__ == "__main__":
    app.run(debug=True)