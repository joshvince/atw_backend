/* ACTIONS FOR UPLOADING IMAGES */
var AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-1"
});

var s3Bucket = new AWS.S3( { params: {Bucket: 'a-thousand-words'} } )

async function createPresignedUrl(filename, filetype) {
  let s3Params = {
    Bucket: 'a-thousand-words',
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: 'public-read'
  };
  try {
    const signedRequest = await s3Bucket.getSignedUrl('putObject', s3Params);
    // console.log(`S3 signed request is ${JSON.stringify(signedRequest)}`)
    return {
      signedRequest: signedRequest,
      url: `https://a-thousand-words.s3.amazonaws.com/${filename}`
    }
  } catch (err) {
    console.log(err)
  }
}




// Currently Local, eventually s3.

function uploadImage(params) {
  console.log(`Received response from Nicolas Cage S3!`)
  return "http://overmental.com/wp-content/uploads/2015/03/nic-cage-face.png"
}

module.exports = {
  uploadImage: uploadImage,
  createPresignedUrl: createPresignedUrl
}