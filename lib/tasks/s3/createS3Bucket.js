// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const AWS_REGION = process.env.AWS_REGION 
const PICTURES_TABLE_NAME = process.env.PICTURES_TABLE_NAME
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

var AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

var s3 = new AWS.S3();

var bucketParams = {Bucket: S3_BUCKET_NAME};

s3.createBucket(bucketParams, function(err, data) {
  if (err) {
     console.log("Error", err);
  } else {
     console.log("Success", data.Location);
  }
});