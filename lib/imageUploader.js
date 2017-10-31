/* ACTIONS FOR UPLOADING IMAGES */
var AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-1"
});

var s3Bucket = new AWS.S3( { params: {Bucket: 'a-thousand-words'} } )

// TODO: this function isn't actually uploading images, it is uploading something else entirely...
function uploadNewImage(image, uuid) {
  return new Promise((resolve, reject) => {
    let filename = buildFileName(image.filename, uuid);
    let data = {
      Key: filename,
      Body: image.binary,
      ACL: 'public-read',
      ContentType: 'image/jpeg'
    }
    s3Bucket.putObject(data, (err, res) => {
      console.log(`S3 Response: ${data}`)
      const url = buildUrl(filename)
      err ?  reject(err) : resolve(url)
    })
  });
}

function createPresignedUrl(filename, uuid) {
  let s3FileName = buildFileName(filename, uuid)
  let params = {
    Bucket: 'a-thousand-words',
    Key: s3FileName
  };
  return s3Bucket.getSignedUrl('putObject', params);
}



// Private functions

// Build the URL using the bucket name and the UUID.
function buildUrl(filename) {
  return `https://s3-eu-west-1.amazonaws.com/a-thousand-words/${filename}`
}

function buildFileName(filename, uuid) {
  let extension = filename.split(".").pop();
  return `${uuid}.${extension}`
}

// Currently Local, eventually s3.

function uploadImage(params) {
  console.log(`Received response from Nicolas Cage S3!`)
  return "http://overmental.com/wp-content/uploads/2015/03/nic-cage-face.png"
}

module.exports = {
  uploadImage: uploadImage,
  uploadNewImage: uploadNewImage
}

// TEST
let TESTUUID = "12345"
let TESTFILE = "mytest.png"

console.log(createPresignedUrl(TESTFILE, TESTUUID))