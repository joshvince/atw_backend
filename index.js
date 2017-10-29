const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Picture = require('./picture/picture.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api', function (req, res) {
  res.send('HI THERE YOU HIT THE API')
})

// test picture data
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

app.get('/api/pictures', function (req, res) {
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
// right now, just send back a fake picture
app.post('/api/pictures/new', function(req, res) {
  res.send(NEWPICTURE)
})

// testing responses to the new picture route.
app.get('/pictures/new', async (req, res) => {
  let TESTPARAMS = {hello: "world", image: "BADBINARYBITCH"};
  const result = await Picture.create(TESTPARAMS);
  result.success ? res.status(201) : res.status(500)
  res.json(result.result);
})

app.listen(3001, function () {
  console.log('ATW API MOCK listening on port 3001!')
})