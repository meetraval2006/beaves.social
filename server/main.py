# This file is only for testing purposes. I will remove this later

import requests

response = requests.post("http://127.0.0.1:5000/api/create_event", json={
    "name": "CS Club ACM",
    "major": "Computer Science",
    "minor": "Mathematics",
    "year": "Freshman",
    "residence_hall": "Baker",
    "groupChatId": "12345",
    "authorId": "67890"
}, headers={"Content-Type": "application/json"})
print(response.text)