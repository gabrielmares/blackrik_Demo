# BlackRik test functions

## How to use

clone this repo and create env file, here you should define your 
access token for POST request.

### First, you need to run up this compose 

Example:

Endpoint : http://localhost:3000/commands

{
    {
        "token": "YOUR-TOKEN",
        "type": "register",
        "aggregateId": 9,
        "aggregateName": "cars",
        "payload": {
            "brand": "toyota",
            "model": "hilux",
            "year": "2012"
        }
    }
}

### aggregateName: Model where you try to put your payload
### type: is the action what you want to do
### payload: Object to register en BD

### After save the payload, endpoint response to client with object witch contain an ID, with this, you can test the query endpoint.

Endpoint http://localhost:3000/query/cars/get?id=RESPONSE_FROM_REGISTER
