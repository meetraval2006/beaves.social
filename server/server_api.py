import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort

import uuid
import re

app = Flask(__name__)
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
        resident_hall = data.get("resident_hall")
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

        if not name or not username or not major or not minor or not year or not resident_hall or not email:
            print("Please provide all the information")
            abort(400, message="Please provide all the information")
        
            
        random_id = str(uuid.uuid4())

        db.collection("users").document(random_id).set({"name": name, "username": username, "major": major, "minor": minor, "year": year, "resident_hall": resident_hall, "email": email})

        return jsonify({"id": random_id, "name": name, "username": username, "major": major, "minor": minor, "year": year, "resident_hall": resident_hall, "email": email})
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, message="Error creating user")


#figure out how to get the user id (aka the document name)
#figure out how to get all the data
@app.route('/api/get_user', methods=['GET'])
def get_user():
    try:
        user_id = request.args.get("id")
        print(f"Received user_id: {user_id}")  # Debugging statement
        if not user_id:
            abort(400, description="User ID is required")
        
        user_doc = db.collection("users").document(user_id).get()
        if not user_doc.exists:
            abort(404, description="User not found")
        
        user_info = user_doc.to_dict()
        user_info["id"] = user_id  # Add the document ID to the dictionary
        
        return jsonify(user_info)
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user")
    #docs = users_ref.stream()
    # user_doc_id: str = ""

    # try:
    #     data = request.get_json()
    #     user_doc_id = data.get("user_doc_id")

    # except Exception as e:
    #     print(f"error: {e}")
    #     abort(400, message="Error creating user")

    # doc = users_ref.document(user_doc_id).get()
    # print(doc)
   
 
    # username = docs.to_dict().get("username")
    # major = docs.to_dict().get("major")
    # minor = docs.to_dict().get("major")
    # year = docs.to_dict().get("year")
    # resident_hall = docs.to_dict().get("resident_hall")
    # name = docs.to_dict().get("name")
    # email = docs.to_dict().get("email")
        
       
    
    

if __name__ == "__main__":
    app.run(debug=True)