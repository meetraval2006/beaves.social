import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify

app = Flask(__name__)

cred = credentials.Certificate('firebase_private.json')
firebase_app = firebase_admin.initialize_app(cred)

db = firestore.client()
users = db.collection("users")

# Gets a list of all users in the database
@app.route("/users", methods=["GET"])
async def users():
    return ...

@app.route("/user", methods=["POST"])
async def add_user():
    docs = db.collection("users").stream()
    next_id = f"{int([doc.id for doc in docs][-1]) + 1}"

    name = request.form.get("name")
    pfp = request.form.get("pfp")
    roles = request.form.get("roles")

    profile = users.document(next_id).set({"name": name, "pfp": pfp, "roles": roles})

# if __name__ == "__main__":
#     app.run(debug=True)