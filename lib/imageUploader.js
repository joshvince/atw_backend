/* ACTIONS FOR UPLOADING IMAGES */

// ENVIRONMENT VARIABLES
const AWS_REGION = process.env.AWS_REGION
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

// AWS SETUP
var AWS = require('aws-sdk');
AWS.config.update({region: AWS_REGION});
var s3Bucket = new AWS.S3( { params: {Bucket: S3_BUCKET_NAME} } )

async function createPresignedUrl(filename, filetype) {
  let s3Params = {
    Bucket: S3_BUCKET_NAME,
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
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createPresignedUrl: createPresignedUrl
}
