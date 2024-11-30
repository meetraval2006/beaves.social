import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort

import uuid
import re


app = Flask(__name__)
api = Api(app)

# firebaseConfig ={
#    'apiKey': "AIzaSyAlcEh2v1rNxuzqzNfdKXyP1UV3hrm7sQQ",
#    'authDomain': "beavs-social.firebaseapp.com",
#    'databaseURL': "https://beavs-social-default-rtdb.firebaseio.com",
#    'projectId': "beavs-social",
#     'storageBucket': "beavs-social.firebasestorage.app",
#    'messagingSenderId': "972710406163",
#    'appId': "1:972710406163:web:75e6f84a6b56a7566e37e6",
#    'measurementId': "G-EWCP2VX0W3"
# }

# #realtime


#firestore
cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred, {"databaseURL": "https://beavs-social-default-rtdb.firebaseio.com/"})

ref = db.reference('/')
ref.get()

@app.route('/api/add_message', methods=['POST'])
def add_message():
    try:
        data = request.get_json()
        sender = data.get("sender")
        recipient = data.get("recipient")
        content = data.get("content")
        timestamp = data.get("timestamp")  # Optional field for storing when the message was sent

        if not sender or not recipient or not content:
            abort(400, message="Sender, recipient, and content are required fields")

        if not re.match(r"^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$", sender):
            abort(400, message="Invalid sender email format")
        if not re.match(r"^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$", recipient):
            abort(400, message="Invalid recipient email format")

        message_id: str = str(uuid.uuid4())
        message_data: dict[str, str] = {
            "sender": sender,
            "recipient": recipient,
            "content": content,
            "timestamp": timestamp or "N/A"
        }

        ref = db.reference('messages')
        ref.child(message_id).set(message_data)
        message_data["id"] = message_id

        return jsonify(message_data)

    except Exception as e:
        print(f"error: {e}")
        abort(400, message="Error adding message")


@app.route('/api/get_messages', methods=['GET'])
def get_messages():
    try:
        recipient = request.args.get("recipient")
        if not recipient:
            abort(400, description="Recipient is required")

        ref = db.reference('messages')
        messages = ref.get()

        recipient_messages = []
        for message_id, message_info in messages.items():
            if message_info.get("recipient") == recipient:
                message_info["id"] = message_id
                recipient_messages.append(message_info)

        return jsonify(recipient_messages)

    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error retrieving messages")

if __name__ == "__main":
    app.run(debug=True)