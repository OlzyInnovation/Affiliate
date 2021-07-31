import requests

headers = {
    'Authorization': 'Bearer 3c73fd8580fc2752f140d034bda5f146cc71124b',
    'Content-Type': 'application/json',
}

data = '{ "long_url": "https://dev.bitly.com", "domain": "bit.ly"}'

response = requests.post('https://api-ssl.bitly.com/v4/shorten', headers=headers, data=data)

print(response.text)