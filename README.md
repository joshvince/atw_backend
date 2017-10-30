# A Thousand Words Backend

## What is this 
This is a really basic backend server for my app, A Thousand Words. It speaks to Dynamo DB and S3 to upload images and associated metadata.

## Setup
- Requires **Node 7.6** at least to make use of async/await and other cool features  
- Requires a local version of **DynamoDB** to be running.  
- Clone this repo  
- `npm install`  
- `node lib/tasks/createTable.js` to create the 'Pictures' table before you start  
- `npm start` will spin up the server on port 3001 (by default)

## API

### TODO