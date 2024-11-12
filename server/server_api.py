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
            abort(400, message="Invalid name. Pleae type your full name")

        if not re.match(r"^[a-zA-Z0-9_$#!.,:><%-=+]+", username):
            print("Invalid username. Please type a valid username")
            abort(400, message="Invalid username. Please type a valid username")
            
        if not isinstance(name, str) or not isinstance(username, str) or not isinstance(major, str) or not isinstance(minor, str) or not isinstance(resident_hall, str) or not isinstance(email, str):
            abort(400, message="Name, username, role, and/or email cannot contain numbers or special characters")
        
        if not isinstance(year, int):
            abort(400, message="Year should be an integer")

        if not name or not username or not major or not minor or not year or not resident_hall or not email:
            print("Please provide all the information")
            abort(400, message="Please provide all the information")
            

        if isinstance(major, list) == False:
            print("Major should be a list")
            abort(400, message="Major should be a list")

        if isinstance(minor, list) == False:
            print("Minor should be a list")
            abort(400, message="Minor should be a list")
        
            
        random_id = str(uuid.uuid4())

        db.collection("users").document(random_id).set({"name": name, "username": username, "major": major, "minor": minor, "year": year, "resident_hall": resident_hall, "email": email})

        return jsonify({"id": random_id, "name": name, "username": username, "major": major, "minor": minor, "year": year, "resident_hall": resident_hall, "email": email})
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, message="Error creating user")

if __name__ == "__main__":
    app.run(debug=True)