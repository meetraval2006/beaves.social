import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort

import uuid

app = Flask(__name__)
api = Api(app)

cred = credentials.Certificate('./server/key.json')
firebase_initialization = firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/api/create_user', methods=['POST'])
def create_user():
    #users = db.collection("users").stream()
    data = request.get_json()

    name = data.get("name")
    pfp = data.get("pfp")
    role = data.get("role")
    email = data.get("email")

    if not name or not pfp or not role or not email:
        abort(400, message="Please provide all the information")

    random_id = str(uuid.uuid4())

    db.collection("users").document(random_id).set({"name": name, "pfp": pfp, "role": role, "email": email})

    return jsonify({"id": random_id, "name": name, "pfp": pfp, "role": role, "email": email})


if __name__ == "__main__":
    app.run(debug=True)