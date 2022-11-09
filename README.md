# CS3219-AY22-23-Project
PeerPrep: https://peerprep.vercel.app

## User Service
To run the service locally:
1. Create a `.env` and populate the following variable:
```
DB_LOCAL_URI=
```
2. Create a Redis server which listens to port `6380`
3. Install npm packages using `npm i`.
4. Run History Service using `npm start`.

## Frontend
To run the service locally:
1. Create `.env` file 
```
REACT_APP_CHAT_SERVICE_CLOUD_ENDPOINT = *REDACTED*
REACT_APP_USER_SERVICE_CLOUD_ENDPOINT = *REDACTED*
REACT_APP_MATCHING_SERVICE_CLOUD_ENDPOINT = *REDACTED*
REACT_APP_QUESTION_SERVICE_CLOUD_ENDPOINT = *REDACTED*
REACT_APP_COLLABORATION_SERVICE_CLOUD_ENDPOINT = *REDACTED*
REACT_APP_HISTORY_SERVICE_CLOUD_ENDPOINT = *REDACTED*

REACT_APP_CHAT_SERVICE_LOCAL_ENDPOINT = "http://localhost:8080" 
REACT_APP_USER_SERVICE_LOCAL_ENDPOINT = "http://localhost:8000/api/user" 
REACT_APP_MATCHING_SERVICE_LOCAL_ENDPOINT = "http://localhost:8001" 
REACT_APP_QUESTION_SERVICE_LOCAL_ENDPOINT = "http://localhost:8002/api/questions" 
REACT_APP_COLLABORATION_SERVICE_LOCAL_ENDPOINT = "http://localhost:8008"
REACT_APP_HISTORY_SERVICE_LOCAL_ENDPOINT = "http://localhost:8003/api/history"
```
2. Install npm packages using `npm i`.
3. Run Frontend using `npm start`, which it will use all the `LOCAL` variables

## History Service

To run the service locally:
1. Create a `.env` file with a line `LOCAL_DB_URL="mongodb://localhost:27017/questionsDb"` in the `history-service` folder.
2. Install npm packages using `npm i`.
3. Run History Service using `npm start`.


## Matching Service

To run the service locally:
1. Install npm packages using `npm i`.
2. Run History Service using `npm start`.
- Please note that an `SQLite` database would be created.

## Collaboration Service

To run the services locally:
1. Start a Local Redis server which listens to port`6379`.
2. Install npm packages using `npm i`.
3. Run Collaboration Service using `npm start`.


## Chat Service
To run the services locally:
1. Install npm packages using `npm i`.
2. Run Chat Service using `npm start`.


## Question Service
To run the services locally:

1. Create local Redis server that listens to port `6379`
2. Create `.env` file and populate following variables:
```
LOCAL_DB_URL
```
3. Install npm packages using `npm i`.
4. Run Question Service using `npm start`.
