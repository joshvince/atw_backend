// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const AWS_REGION = process.env.AWS_REGION 
const AWS_ENDPOINT = process.env.AWS_ENDPOINT 
const PICTURES_TABLE_NAME = process.env.PICTURES_TABLE_NAME

var AWS = require("aws-sdk");
AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT
});
var dynamodb = new AWS.DynamoDB();

var DELETEPARAMS = {
  TableName: PICTURES_TABLE_NAME
}

dynamodb.deleteTable(DELETEPARAMS, (err, data) => {
  err ? console.error(err) : console.log(`Table Deleted: ${JSON.stringify(data, null, 2)}`)
})

