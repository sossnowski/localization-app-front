import requests

for i in range(1,100):
    url = "http://127.0.0.1:3005/user/login"
    data = {"username": "abcd", "password": "1234"}
    response = requests.post(url, data=data)
    print(response.text)