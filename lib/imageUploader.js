/* ACTIONS FOR UPLOADING IMAGES */
var AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-1"
});

var S3Bucket = new AWS.S3( { params: {Bucket: 'a-thousand-words'} } )

// TODO: this function needs to return the url of the newly created object...
function uploadNewImage(image, uuid) {
  return new Promise((resolve, reject) => {
    let data = {
      Key: uuid,
      Body: image.binary
    }
    S3Bucket.putObject(data, (err, res) => {
      const url = buildUrl(S3Bucket, uuid)
      err ?  reject(err) : resolve(url)
    })
  });
}

// Private functions

// Build the URL using the bucket name and the UUID.
//TODO: this, but real....
function buildUrl(bucketName, uuid) {
  return `https://s3.amazon.com/${bucketName}/${uuid}`
}

// Currently Local, eventually s3.

function uploadImage(params) {
  console.log(`Received response from Nicolas Cage S3!`)
  return "http://overmental.com/wp-content/uploads/2015/03/nic-cage-face.png"
}

module.exports = uploadImage
