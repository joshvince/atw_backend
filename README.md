# A Thousand Words Backend

## What is this 
This is a really basic backend server for the A Thousand Words app. It speaks to Dynamo DB, and also handles basic user management and also provides presigned URLs for S3.

## Setup
- Requires **Node 7.6** at least to make use of async/await and other cool features  
- Requires a local version of **DynamoDB** to be running (`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb` from the directory containing the executable)
- Clone this repo  
- `npm install`  
- `node lib/tasks/picture/createTable.js` to create the 'Pictures' table if necessary
- `node lib/tasks/user/createTable.js` to create the 'Users' table if necessary
- `npm start` will spin up the server on port 3001 (by default)

## API

### GET `/stories/all`
Returns JSON array of all the story records currently in the database

### GET `/stories/:storyId`
Expects `:storyId` to be a valid UUID of a story already in the database.  

If there is a record in the table with that UUID, this returns a code `200` along with the item as JSON in the body of the response.  

If there was was no record found with that UUID, it will return a code `404`. The body will be an error message.

### POST `/stories/new`
Accepts JSON data.  
The body of your request should be a valid story JSON:  

There is only a limited schema enforced:  
```
{
  userId: "String",
  uuid: "String",
  title: "String",
  subtitle: "String",
  steps: [validStep, validStep]
}

```

`steps` should be an array containing valid JSON objects that adhere to this schema:

```
{
  headline: "String", 
  description: "String", 
  stepKey: "String",
  image: {
    url: "String",
    uuid: "String",
    userId: "String"
  }
}
```

The app uses `uuidv4` for ids.  

Currently, the actual uploading of the images is done on the client side, and this app just accepts image urls within the `image` attribute of a story's `step`.  

Returns the JSON object that was entered into the DB, or an error object.  

### GET `/sign-s3`
_Required Query Params_: `file-type` and `file-name`  

Returns a presigned URL that will allow the client to upload an image to an S3 bucket.  

### GET `users/all`

Returns a JSON array of user objects currently in the Database.  

### GET `/signin`
_Required Query Params_: `user-id`  

Returns a JSON object representing the  user associated with the given `user-id` or `{error: reason}` if there was no user associated with the given ID.