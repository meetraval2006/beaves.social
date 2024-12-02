import firebase_admin
from firebase_admin import db as firebase_db, credentials, firestore
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
firebase_initialization = firebase_admin.initialize_app(cred, {"databaseURL": "https://beavs-social-default-rtdb.firebaseio.com/"})
db = firestore.client()

ref = firebase_db.reference('/')
ref.get()

# User methods

@app.route('/api/create_user', methods=['POST'])
def create_user():
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

@app.route("/api/get_user", methods=["GET"])
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

@app.route('/api/get_users', methods=['GET'])
def get_users():
    try:
        users_ref = db.collection("users")
        docs = users_ref.stream()
        users = []
        
        for doc in docs:
            user_data = doc.to_dict()
            user_data["id"] = doc.id  # Add the document ID to the dictionary
            users.append(user_data)

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

# Chat messages methods

@app.route('/api/create_gc', methods=['POST'])
def create_gc():
    """
    Endpoint to add a message to the Firebase Realtime Database.
    Expects JSON input with 'timestamp', 'text', 'likes', and 'replyId'.
    """
    try:
        data = request.get_json()
        gc_name = data.get("gc_name")
        is_gc = data.get("is_gc")
        users = data.get("users")
        messages = data.get("messages")

        chat_id = str(uuid.uuid4())

        gc_data = {
            "gc_name": gc_name,
            "is_gc": is_gc,
            "users": users,
            "messages": messages
        }

        ref = firebase_db.reference(chat_id)
        ref.set(gc_data)
        
        return jsonify(gc_data), 201

    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": "Failed to add message"}), 500

#get all the gc
@app.route('/api/get_gc', methods=['GET'])
def get_gc():
    ...

#get the gcs that a particular user is in. For example, use Robert's id to get all the gcs that he is in
@app.route('/api/get_gcs', methods=['GET'])
def get_gcs():
    ...

@app.route('/api/add_messages', methods=['POST'])
def add_messages():
    try:
        data = request.get_json()

        chat_id = data.get("chat_id")
        timestamp = data.get("timestamp")
        likes = data.get("likes")
        text = data.get("text")
        isPinned = data.get("isPinned")
        user_id = data.get("user_id")

        message_id = str(uuid.uuid4())

        message_data = {
            "text": text,
            "isPinned": isPinned,
            "likes": likes,
            "timestamp": timestamp,
            "user_id": user_id #id of the user who sent the message
        }

        ref = firebase_db.reference(chat_id)
        ref.child(message_id).set(message_data)

        return jsonify(message_data), 201
    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": "Failed to add message"}), 500

@app.route('/api/update_chat', methods=['POST'])
def update_chat():
    ...

# @app.route('/api/get_messages', methods=['GET'])
# def get_messages():
#     """
#     Endpoint to retrieve all messages containing a specific text.
#     Expects 'text' as a query parameter.
#     """
#     try:
#         text = request.args.get("text")
#         if not text:
#             return jsonify({"error": "Text parameter is required"}), 400

#         ref = firebase_db.reference('messages')
#         messages = ref.get()

#         if not messages:
#             return jsonify([])

#         filtered_messages = [
#             {"id": msg_id, **msg_data}
#             for msg_id, msg_data in messages.items()
#             if text.lower() in msg_data.get("text", "").lower()
#         ]

#         return jsonify(filtered_messages), 200

#     except Exception as e:
#         print(f"Error retrieving messages: {e}")
#         return jsonify({"error": "Failed to retrieve messages"}), 500

# Event methods

@app.route('/api/create_event', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        name = data.get("name")
        majors: list[str] = data.get("major")
        minors: list[str] = data.get("minor")
        years: list[str] = data.get("year")
        residence_halls: list[str] = data.get("residence_hall")
        group_chat_id = data.get("groupChatId")
        author_id = data.get("authorId")

        if not name or not group_chat_id or not author_id:
            abort(400, message="Please provide all the required event information")

        random_id = str(uuid.uuid4())
        
        dictionary = {
            "name": name,
            "majors": majors or [],
            "minors": minors or [],
            "years": years or [],
            "residence_halls": residence_halls or [],
            "groupChatId": group_chat_id,
            "authorId": author_id
        }
        db.collection("events").document(random_id).set(dictionary)

        dictionary["eventId"] = random_id
        return jsonify(dictionary)
    
    except Exception as e:
        abort(400, message=f"Error creating event: {e}")

@app.route('/api/get_events', methods=['GET'])
def get_events():
    try:
        events_ref = db.collection("events")
        docs = events_ref.stream()
        events = []
        #user_id = []
        for doc in docs:
            events_data = doc.to_dict()
            events_data["id"] = doc.id  # Add the document ID to the dictionary
            events.append(events_data)

            # user_id = users["id"]
            # user_id.to_dict()
        return jsonify(events)
        
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user")


if __name__ == "__main__":
    app.run(debug=True)