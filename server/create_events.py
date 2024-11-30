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
