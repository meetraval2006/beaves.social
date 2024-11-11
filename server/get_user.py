import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('./server/key.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()


def get_user():
    docs = db.collection("users").stream()

    while True:
        try:
            for doc in docs:
                global doc_id
                doc_id = doc.id
                return doc_id
        except StopIteration:
            break

get_user()
print(f"User ID: {doc_id}")
