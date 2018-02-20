// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const PORT = process.env.PORT || 3001

// DEPENDENCIES
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Picture = require('./picture/picture.js');
const User = require('./user/user.js');
const ImageUploader = require('./lib/imageUploader.js');
const Story = require('./story/story.js');

// MIDDLEWARE
app.use(morgan('dev')); // dev logging
app.use(bodyParser.json({limit: '2mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// ROUTES

app.get('/', function (req, res) {
  res.send('Hello There World!')
})

// PICTURES

// Get all the pictures WARNING this will literally just give you everything, 
// So use it with caution...
app.get('/pictures/all', async (req, res) => {
  const result = await Picture.getAll({});
  result.success ? res.status(200) : res.status(500)
  res.json(result.result)
})

// Get all pictures stored against the given user ID, which should be supplied
// as query params.
app.get('/pictures', async (req, res) => {
  const userId = req.query['user-id'];
  const result = await Picture.getByUser(userId);
  result.success ? res.status(200) : res.status(500)
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

// Get one picture by a pictureId
app.get('/pictures/:pictureId', async (req, res) => {
  return await Picture.getOnePicture(req.params.pictureId).then(resp => {
    resp.success ? res.status(200) : res.status(404)
    res.json(resp.result)
  })
})

// IMAGES (S3)

// Send a presigned URL so the client can upload the image to S3.
app.get('/sign-s3', async (req, res) => {
  let filename = req.query['file-name'];
  let filetype = req.query['file-type'];
  const signedUrl = await ImageUploader.createPresignedUrl(filename, filetype)
  res.json(signedUrl);
})

// USERS 

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
    console.log(`User list is: ${JSON.stringify(list)}`)
    res.status(200)
    res.json(list)
  }).catch(err => {
    res.status(500)
    res.json({error: "Could not fetch the user list"})
  }); 

})

// STORIES

// Create a new story
app.post('/stories/new', async (req, res) => {
  console.log(`RECEIVED POST ${JSON.stringify(req.body, null, 2)}`)
  if (Story.validate(req.body)) {
    const result = await Story.createNewStory(req.body);
    result.success ? res.status(201) : res.status(500)
    res.json(result.result);
  }
  else {
    res.status(400)
    res.send("Bad Request")
  }
})

// Get all the stories
app.get('/stories/all', async (req, res) => {
  const result = await Story.getAll({});
  result.success ? res.status(200) : res.status(500)
  res.json(result.result)
})

// Get all the stories by the given userId.
app.get('/stories', (req, res) => {
  const userId = req.query['user-id'];
  Story.getStoriesByUser(userId).then(result => {
    res.status(200)
    res.json(result.result)
  }).catch(err => {
    res.status(500)
    res.json(err)
  })
})

//TODO: make this consistent: either use async/await or .then() rather than
// mixing between.

// Get one story by the story id
app.get('/stories/:storyId', async (req, res) => {
  return await Story.getOneStory(req.params.storyId).then(resp => {
    resp.success ? res.status(200) : res.status(404)
    res.json(resp.result)
  })
})

app.listen(PORT, function () {
  console.log(`ATW API listening on port ${PORT}!`)
})
