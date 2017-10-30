/* Create a new S3 bucket */

var AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-1"
});

var s3 = new AWS.S3();

var bucketParams = {Bucket: 'a-thousand-words'};

s3.createBucket(bucketParams)