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
    try:
        data = request.get_json()
        name = data.get("name")
        username = data.get("username")
        major = data.get("major")
        minor = data.get("minor")
        year = data.get("year")
        resident_hall = data.get("resident_hall")
        email = data.get("email")

        if not re.match(r"^[a-zA-Z]+", name):
            abort(400, message="Invalid name. Please type your full name")

        if not re.match(r"^[a-zA-Z0-9_$#!.,:><%-=+]+", username):
            abort(400, message="Invalid username. Please type a valid username")

        if not re.match(r"^[a-zA-Z0-9]+@oregonstate.edu", email):
            abort(400, message="Invalid email. Please type a valid Oregon State email")

        if not name or not username or not major or not minor or not year or not resident_hall or not email:
            abort(400, message="Please provide all the information")
        
        random_id = str(uuid.uuid4())

        db.collection("users").document(random_id).set({
            "name": name,
            "username": username,
            "major": major,
            "minor": minor,
            "year": year,
            "resident_hall": resident_hall,
            "email": email
        })

        return jsonify({
            "id": random_id, "name": name, "username": username, 
            "major": major, "minor": minor, "year": year, 
            "resident_hall": resident_hall, "email": email
        })
    
    except Exception as e:
        abort(400, message=f"Error creating user: {e}")


@app.route('/api/get_user', methods=['GET'])
def get_user():
    users_ref = db.collection("users")
    docs = users_ref.stream()

    users = []
    for doc in docs:
        user_data = doc.to_dict()
        users.append(user_data)
       
    return jsonify(users)


@app.route('/api/create_event', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        event_title = data.get("eventTitle")
        event_date = data.get("eventDate")
        location = data.get("location")
        description = data.get("description")
        max_participants = data.get("maxParticipants")
        tags = data.get("tags")
        author_id = data.get("authorId")

        if not event_title or not event_date or not location or not description or not author_id:
            abort(400, message="Please provide all the required event information")

        random_id = str(uuid.uuid4())

        db.collection("events").document(random_id).set({
            "eventTitle": event_title,
            "eventDate": event_date,
            "location": location,
            "description": description,
            "maxParticipants": max_participants,
            "tags": tags,
            "authorId": author_id
        })

        return jsonify({
            "eventId": random_id, "eventTitle": event_title, 
            "eventDate": event_date, "location": location, 
            "description": description, "maxParticipants": max_participants, 
            "tags": tags, "authorId": author_id
        })
    
    except Exception as e:
        abort(400, message=f"Error creating event: {e}")


if __name__ == "__main__":
    app.run(debug=True)
