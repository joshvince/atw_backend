const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Picture = require('./picture/picture.js');
const User = require('./user/user.js');
const ImageUploader = require('./lib/imageUploader.js');

app.use(morgan('dev')); // dev logging
app.use(bodyParser.json({limit: '2mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get all the pictures
app.get('/pictures/all', async (req, res) => {
  const result = await Picture.getAll({});
  result.success? res.status(200) : res.status(500)
  res.json(result.result)
})

// Create a new picture
app.post('/pictures/new', async (req, res) => {
  console.log(`RECEIVED POST ${JSON.stringify(req.body, null, 2)}`)
  if (Picture.validate(req.body)) {
    const result = await Picture.create(req.body);
    result.success ? res.status(201) : res.status(500)
    res.json(result.result);
  }
  else {
    res.status(400)
    res.send("Bad Request")
  }
})

/* This is a basic "sign in" implementation, that listens for user ids
and then queries the user table for users with that ID. It returns the
user object if it found one and an error if it didn't */
app.get('/signin', (req, res) => {
  const requestedId = req.query['user-id'];
  User.logIn(requestedId).then(result => {
    if (result) {
      res.status(200)
      res.json(result)
    }
    else {
      res.status(500)
      res.json({error: "User was not found"})
    }
  })
})

// Returns a list of users in the DB
app.get('/users/all', (req, res) => {
  User.getUserList().then(list => {
    res.status(200)
    res.json(list)
  }).catch(err => {
    res.status(500)
    res.json({error: "Could not fetch the user list"})
  }); 
// Send a presigned URL so the client can upload the image to S3.
app.get('/sign-s3', async (req, res) => {
  let filename = req.query['file-name'];
  let filetype = req.query['file-type'];
  const signedUrl = await ImageUploader.createPresignedUrl(filename, filetype)
  res.json(signedUrl);
})

app.listen(3001, function () {
  console.log('ATW API listening on port 3001!')
})
