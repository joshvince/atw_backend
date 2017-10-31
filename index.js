const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Picture = require('./picture/picture.js');

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

/* 

TEST CALLS 

ALWAYS RETURN FAKE DATA 

*/

var ALLPICTURES = [
  {
    year: 2010,
    name: "My first pic",
    description: "something descripty",
    image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/09/12/22/Gary_Busey.jpg",
    location: {
      coordinates: [51.51124190491075, -0.11714594729244254]
    }
  },
  {
    year: 2009,
    name: "The Next Episode",
    description: "Aayeehaayeehh",
    image: "https://pursuit.ca/wp-content/uploads/2013/01/72014-actor-gary-busey-arrives-at-the-80th-annual-academy-awards-in-hollywoo.jpg",
    location: {
      coordinates: [51.51137878750785, -0.12079375155269645]
    }
  }
]

app.get('/test/pictures', function (req, res) {
  res.json(ALLPICTURES)
})

var NEWPICTURE = {
  year: 2008,
  name: "YOUR NEW PICTURE",
  description: "CAGE mofo",
  image: "http://overmental.com/wp-content/uploads/2015/03/nic-cage-face.png",
  location: {
    coordinates: [51.29366510461659, -0.007704632002884182]
  }
}

app.post('/test/pictures/new', function(req, res) {
  res.send(NEWPICTURE)
})

/* 


REAL IMPLEMENTATION WORKING WITH ACTUAL DATA


*/

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

app.listen(3001, function () {
  console.log('ATW API listening on port 3001!')
})
