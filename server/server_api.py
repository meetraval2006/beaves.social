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
    users_ref = db.collection("users")
    docs = users_ref.stream()
    
    for doc in docs:
        #pfp = data.get("pfp")
        username = doc.to_dict().get("username")
        user_major = doc.to_dict().get("major")
        user_minor = doc.to_dict().get("major")
        year = doc.to_dict().get("year")
        resident_hall = doc.to_dict().get("resident_hall")
        user_name = doc.to_dict().get("name")
        user_email = doc.to_dict().get("email")
        
       
    return jsonify({"name": user_name, "email": user_email, "major": user_major, "minor": user_minor, "year": year, "resident_hall": resident_hall, "username": username})
    

if __name__ == "__main__":
    app.run(debug=True)