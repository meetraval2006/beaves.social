import firebase_admin
from firebase_admin import db as firebase_db, credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse, abort
from flask_socketio import SocketIO, emit

import uuid
import re
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
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

@app.route("/api/update_user", methods=["PUT"])
def update_user():
    try:
        data = request.get_json()
        user_id = data.get("id")
        name = data.get("name")
        #pfp = data.get("pfp")
        username = data.get("username")
        major = data.get("major")
        minor = data.get("minor")
        year = data.get("year")
        residence_hall = data.get("residence_hall")
        email = data.get("email")
        
        if not user_id:
            print("User ID is required")
            abort(400, description="User ID is required")

        if not re.match(r"^[a-zA-Z]+", name):
            print("Invalid name. Please type your full name")
            abort(400, message="Invalid name. Please type your full name")

        if not re.match(r"^[a-zA-Z0-9_@$#!.,:><%-=+]+", username):
            print("Invalid username. Please type a valid username")
            abort(400, message="Invalid username. Please type a valid username")

        if not re.match(r"^[a-zA-Z0-9]+@oregonstate.edu", email):
            print("Invalid email. Please type a valid Oregon State email")
            abort(400, message="Invalid email. Please type a valid Oregon State email")

        if not name or not username or not major or not minor or not year or not residence_hall or not email:
            print("Please provide all the information")
            abort(400, message="Please provide all the information")
        
            
        user_data: dict[str, str] = {
            "name": name, 
            "username": username, 
            "major": major, 
            "minor": minor, 
            "year": year, 
            "residence_hall": residence_hall, 
            "email": email
        }
        
        print(f"Updating user with ID: {user_id}")
        db.collection("users").document(user_id).update(user_data)
        print(f"User with ID: {user_id} updated successfully")
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
        user_info["id"] = docs[0].id

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

@app.route('/api/get_user_by_id', methods=['GET'])
def get_user_by_id():
    try:
        if not request.args.get("id"):
            abort(400, description="Email is required")

        id = request.args.get("id")
        doc = db.collection("users").document(id).get()

        if not doc:
            return jsonify({"error": "User not found"})
        
        user_info = doc.to_dict()
        print(id)
        return jsonify(user_info)
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error getting user id")

# Chat messages methods

@app.route('/api/create_gc', methods=['POST'])
def create_gc():
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
            "messages": messages,
            "unreadCount": 0,
            "lastUpdated": int(time.time() * 1000)  # Use milliseconds for consistency with JS
        }

        ref = firebase_db.reference(chat_id)
        ref.set(gc_data)
        
        return jsonify({"gc_id": chat_id, **gc_data}), 201

    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": "Failed to create GC"}), 500

#get all the gc

@app.route('/api/get_gc', methods=['GET'])
def get_gc():
    try:
        chat_id = request.args.get("chat_id")
        ref = firebase_db.reference(chat_id)
        data = ref.get()
        data["gc_id"] = chat_id
        return jsonify(data)

    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": "Failed to get GC"}), 500

#get the gcs that a particular user is in. For example, use Robert's id to get all the gcs that he is in
@app.route('/api/get_gcs', methods=['GET'])
def get_gcs():
    try:
        ref = firebase_db.reference('/')
        return jsonify(ref.get())

    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": "Failed to get GCs"}), 500

@app.route('/api/add_messages', methods=['POST'])
def add_messages():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        message_id = data.get("id")  # Use the client-generated ID
        timestamp = data.get("timestamp") or int(time.time() * 1000)
        likes = data.get("likes", 0)
        text = data.get("text")
        isPinned = data.get("isPinned", False)
        user_id = data.get("user_id")
        username = data.get("username")

        if not all([chat_id, message_id, text, user_id, username]):
            return jsonify({"error": "Missing required fields"}), 400

        message_data = {
            "id": message_id,
            "chat_id": chat_id,
            "text": text,
            "isPinned": isPinned,
            "likes": likes,
            "timestamp": timestamp,
            "user_id": user_id,
            "username": username,
            "read_by": {user_id: True}
        }

        ref = firebase_db.reference(chat_id)
        chat_data = ref.get()

        if chat_data:
            users = chat_data.get("users", [])
            
            # Add the new message
            ref.child("messages").child(message_id).set(message_data)

            # Update unread count by counting only unread messages from other users
            messages_dict = chat_data.get("messages", {})
            unread_count = sum(
                1 for msg in messages_dict.values() 
                if msg.get("user_id") != user_id  # Only count messages from other users
                and user_id not in msg.get("read_by", {})  # That haven't been read by current user
            )
            ref.child("unreadCount").set(unread_count)
            
            # Update lastUpdated timestamp
            ref.child("lastUpdated").set(int(time.time() * 1000))

            # Emit the new message to all connected clients
            socketio.emit('new_message', {
                'chat_id': chat_id,
                'message': message_data
            })

            return jsonify({"message": "Message added successfully", "id": message_id}), 201
        else:
            return jsonify({"error": "Chat not found"}), 404
    
    except Exception as e:
        print(f"Error adding message: {e}")
        return jsonify({"error": f"Failed to add message: {str(e)}"}), 500

def get_unread_count(chat_id, user_id):
    ref = firebase_db.reference(chat_id)
    messages = ref.child("messages").get()
    if not messages:
        return 0
    return sum(
        1 for msg in messages.values() 
        if msg.get('user_id') != user_id  # Only count messages from other users
        and user_id not in msg.get('read_by', {})  # That haven't been read by current user
        and msg.get('timestamp', 0) > 0  # Ensure message has valid timestamp
    )

@app.route('/api/mark_messages_read', methods=['POST'])
def mark_messages_read():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        user_id = data.get("user_id")

        if not chat_id or not user_id:
            return jsonify({"error": "Chat ID and User ID are required"}), 400

        ref = firebase_db.reference(chat_id)
        chat_data = ref.get()

        if chat_data:
            messages = chat_data.get("messages", {})
            updates = {}
            
            # Mark all messages as read for this user
            for message_id, message in messages.items():
                if message.get("user_id") != user_id:
                    read_by = message.get("read_by", {})
                    if user_id not in read_by:
                        read_by[user_id] = True
                        updates[f"messages/{message_id}/read_by"] = read_by
            
            if updates:
                ref.update(updates)
            
            # Get the correct unread count
            unread_count = get_unread_count(chat_id, user_id)
            ref.child("unreadCount").set(unread_count)
            
            # Emit the updated unread count to all connected clients
            socketio.emit('unread_count_update', {
                'chat_id': chat_id,
                'unread_count': unread_count
            })
            
            return jsonify({"message": "Messages marked as read successfully", "unreadCount": unread_count}), 200
        else:
            return jsonify({"error": "Chat not found"}), 404

    except Exception as e:
        print(f"Error marking messages as read: {e}")
        return jsonify({"error": f"Failed to mark messages as read: {str(e)}"}), 500

#liked and isPinned done after hackathon
@app.route('/api/update_chat', methods=['POST'])
def update_chat():
    pass

@app.route('/api/like_message', methods=['POST'])
def like_message():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        message_id = data.get("message_id")
        user_id = data.get("user_id")

        if not chat_id or not message_id or not user_id:
            abort(400, message="Chat ID, Message ID, and User ID are required")

        ref = firebase_db.reference(chat_id)

        print(ref.child("messages"), ref.child("messages").child(message_id))

        message_ref = ref.child("messages").child(message_id)
        message_data = message_ref.get()

        if message_data:
            likes = message_data.get("likes", 0)
            liked_by = message_data.get("liked_by", [])

            if user_id in liked_by:
                liked_by.remove(user_id)
                likes -= 1
            else:
                liked_by.append(user_id)
                likes += 1

            message_ref.update({
                "likes": likes,
                "liked_by": liked_by
            })

            return jsonify({"message": "Message like status updated successfully"}), 200
        else:
            abort(404, message="Message not found")

    except Exception as e:
        print(f"Error updating message like status: {e}")
        return jsonify({"error": "Failed to update message like status"}), 500

@app.route('/api/pin_message', methods=['POST'])
def pin_message():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        message_id = data.get("message_id")

        if not chat_id or not message_id:
            abort(400, message="Chat ID and Message ID are required")

        ref = firebase_db.reference(chat_id)
        message_ref = ref.child("messages").child(message_id)
        message_data = message_ref.get()

        if message_data:
            is_pinned = not message_data.get("isPinned", False)
            message_ref.update({"isPinned": is_pinned})

            return jsonify({"message": f"Message {'pinned' if is_pinned else 'unpinned'} successfully"}), 200
        else:
            abort(404, message="Message not found")

    except Exception as e:
        print(f"Error updating message pin status: {e}")
        return jsonify({"error": "Failed to update message pin status"}), 500

@app.route('/api/edit_message', methods=['POST'])
def edit_message():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        message_id = data.get("message_id")
        new_text = data.get("new_text")
        is_latest = data.get("is_latest", False)

        if not chat_id or not message_id or not new_text:
            abort(400, message="Chat ID, Message ID, and new text are required")

        ref = firebase_db.reference(chat_id)
        message_ref = ref.child("messages").child(message_id)
        message_ref.update({"text": new_text})

        if is_latest:
            socketio.emit('message_edit', {
                'chat_id': chat_id,
                'message_id': message_id,
                'new_text': new_text,
                'is_latest': True
            })

        return jsonify({"message": "Message updated successfully"}), 200

    except Exception as e:
        print(f"Error editing message: {e}")
        return jsonify({"error": "Failed to edit message"}), 500

@app.route('/api/delete_message', methods=['POST'])
def delete_message():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        message_id = data.get("message_id")
        is_latest = data.get("is_latest", False)

        if not chat_id or not message_id:
            abort(400, message="Chat ID and Message ID are required")

        ref = firebase_db.reference(chat_id)
        message_ref = ref.child("messages").child(message_id)
        message_ref.delete()

        if is_latest:
            socketio.emit('message_delete', {
                'chat_id': chat_id,
                'message_id': message_id,
                'is_latest': True
            })

        return jsonify({"message": "Message deleted successfully"}), 200

    except Exception as e:
        print(f"Error deleting message: {e}")
        return jsonify({"error": "Failed to delete message"}), 500

@app.route('/api/update_gc_name', methods=['POST'])
def update_gc_name():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        new_name = data.get("new_name")

        if not chat_id or not new_name:
            abort(400, message="Chat ID and new name are required")

        ref = firebase_db.reference(chat_id)
        ref.update({"gc_name": new_name})

        return jsonify({"message": "Group chat name updated successfully"}), 200

    except Exception as e:
        print(f"Error updating group chat name: {e}")
        return jsonify({"error": "Failed to update group chat name"}), 500

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
        majors: list[str] = data.get("majors")
        minors: list[str] = data.get("minors")
        years: list[str] = data.get("years")
        residence_halls: list[str] = data.get("residence_halls")
        event_description = data.get("eventDescription")
        author_id = data.get("authorId")

        # Ensure these fields are arrays
        majors = majors if isinstance(majors, list) else []
        minors = minors if isinstance(minors, list) else []
        years = years if isinstance(years, list) else []
        residence_halls = residence_halls if isinstance(residence_halls, list) else []

        if not name or not author_id:
            abort(400, message="Please provide all the required event information")

        random_id = str(uuid.uuid4())
        groupChatId = str(uuid.uuid4())
        
        # Create the group chat
        gc_data = {
            "gc_name": f"Event: {name}",
            "is_gc": True,
            "users": [author_id],
            "messages": [],
            "unreadCount": 0,
            "lastUpdated": int(time.time() * 1000) # Use milliseconds for consistency with JS
        }
        firebase_db.reference(groupChatId).set(gc_data)
        
        dictionary = {
            "name": name,
            "majors": majors,
            "minors": minors,
            "years": years,
            "residence_halls": residence_halls,
            "eventDescription": event_description,
            "authorId": author_id,
            "groupChatId": groupChatId
        }
        
        db.collection("events").document(random_id).set(dictionary)
        return jsonify(dictionary)
    
    except Exception as e:
        abort(400, message=f"Error creating event: {e}")

def add_system_message(chat_id, message_text):
    message_id = str(uuid.uuid4())
    timestamp = int(time.time() * 1000)
    system_message = {
        "id": message_id,
        "chat_id": chat_id,
        "text": message_text,
        "isPinned": False,
        "likes": 0,
        "timestamp": timestamp,
        "user_id": "system",
        "username": "System",
        "read_by": {}
    }
    
    ref = firebase_db.reference(chat_id)
    ref.child("messages").child(message_id).set(system_message)
    ref.child("lastUpdated").set(timestamp)
    
    # Emit the new message to all connected clients
    socketio.emit('new_message', {
        'chat_id': chat_id,
        'message': system_message
    })

@app.route('/api/join_event', methods=['POST'])
def join_event():
    try:
        data = request.get_json()
        event_id = data.get("eventId")
        user_id = data.get("userId")
        group_chat_id = data.get("groupChatId")

        if not event_id or not user_id or not group_chat_id:
            abort(400, message="Please provide all the required information")

        # Get username of the joining user
        user_doc = db.collection("users").document(user_id).get()
        username = user_doc.to_dict().get("username", "Unknown User") if user_doc.exists else "Unknown User"

        # Add user to the group chat
        ref = firebase_db.reference(group_chat_id)
        gc_data = ref.get()
        if gc_data:
            users = gc_data.get("users", [])
            if user_id not in users:
                users.append(user_id)
                ref.child("users").set(users)
                
                # Add system message about user joining
                add_system_message(group_chat_id, f"{username} has joined the group chat")
                
            return jsonify({"message": "User added to group chat successfully"}), 200
        else:
            abort(404, message="Group chat not found")

    except Exception as e:
        abort(400, message=f"Error joining event: {e}")

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

@app.route("/api/delete_event", methods=["DELETE"])
def delete_event():
    try:
        event_id = request.args.get("id")
        if not event_id:
            abort(400, description="Event ID is required")

        db.collection("events").document(event_id).delete()
        return jsonify({"message": "Event deleted successfully"})
    
    except Exception as e:
        print(f"error: {e}")
        abort(400, description="Error deleting event")

@app.route('/api/add_user_to_gc', methods=['PUT'])
def add_user_to_gc():
    try:
        chat_id = request.args.get("chat_id")
        user_id = request.args.get("user_id")

        if not chat_id or not user_id:
            abort(400, message="Chat ID and User ID are required")

        # Get username of the added user
        user_doc = db.collection("users").document(user_id).get()
        username = user_doc.to_dict().get("username", "Unknown User") if user_doc.exists else "Unknown User"

        ref = firebase_db.reference(chat_id)
        gc_data = ref.get()
        if gc_data:
            users = gc_data.get("users", [])
            if user_id not in users:
                users.append(user_id)
                ref.child("users").set(users)
                
                # Add system message about user being added
                add_system_message(chat_id, f"{username} has been added to the group chat")
                
                return jsonify({"message": "User added to GC successfully"}), 200
            else:
                return jsonify({"message": "User already in GC"}), 200
        else:
            abort(404, message="Group chat not found")

    except Exception as e:
        print(f"Error adding user to GC: {e}")
        return jsonify({"error": "Failed to add user to GC"}), 500

@app.route('/api/remove_user_from_gc', methods=['PUT'])
def remove_user_from_gc():
    try:
        chat_id = request.args.get("chat_id")
        user_id = request.args.get("user_id")

        if not chat_id or not user_id:
            abort(400, message="Chat ID and User ID are required")

        # Get username of the removed user
        user_doc = db.collection("users").document(user_id).get()
        username = user_doc.to_dict().get("username", "Unknown User") if user_doc.exists else "Unknown User"

        ref = firebase_db.reference(chat_id)
        gc_data = ref.get()

        if gc_data:
            users = gc_data.get("users", [])
            if user_id in users:
                users.remove(user_id)
                ref.child("users").set(users)
                
                # Add system message about user being removed
                add_system_message(chat_id, f"{username} has been removed from the group chat")
                
                return jsonify({"message": "User removed from GC successfully"}), 200
            else:
                return jsonify({"message": "User not in GC"}), 200
        else:
            abort(404, message="Group chat not found")

    except Exception as e:
        print(f"Error removing user from GC: {e}")
        return jsonify({"error": "Failed to remove user from GC"}), 500

@app.route('/api/leave_group_chat', methods=['POST'])
def leave_group_chat():
    try:
        data = request.get_json()
        chat_id = data.get("chat_id")
        user_id = data.get("user_id")

        if not chat_id or not user_id:
            abort(400, message="Chat ID and User ID are required")

        ref = firebase_db.reference(chat_id)
        gc_data = ref.get()

        if gc_data:
            users = gc_data.get("users", [])
            if user_id in users:
                users.remove(user_id)
                ref.child("users").set(users)

                # Add a system message about the user leaving
                user_doc = db.collection("users").document(user_id).get()
                username = user_doc.to_dict().get("username", "Unknown User") if user_doc.exists else "Unknown User"

                message_id = str(uuid.uuid4())
                timestamp = int(time.time() * 1000)
                system_message = {
                    "id": message_id,
                    "chat_id": chat_id,
                    "text": f"{username} has left the group chat",
                    "isPinned": False,
                    "likes": 0,
                    "timestamp": timestamp,
                    "user_id": "system",
                    "username": "System",
                    "read_by": {}
                }
                ref.child("messages").child(message_id).set(system_message)

                # Emit the user leave event
                socketio.emit('user_leave_chat', {
                    'chat_id': chat_id,
                    'user_id': user_id
                })

                return jsonify({"message": "User removed from group chat successfully"}), 200
            else:
                return jsonify({"message": "User not in group chat"}), 200
        else:
            abort(404, message="Group chat not found")

    except Exception as e:
        print(f"Error removing user from group chat: {e}")
        return jsonify({"error": "Failed to remove user from group chat"}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)

