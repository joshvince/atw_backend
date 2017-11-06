// Creates two seed users for local development
// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const AWS_REGION = process.env.AWS_REGION 
const AWS_ENDPOINT = process.env.AWS_ENDPOINT 
const USERS_TABLE_NAME = process.env.USERS_TABLE_NAME

var AWS = require("aws-sdk");
AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT
});

var dynamodb = new AWS.DynamoDB();

const User = require('../../../user/user.js');

User.createNewUser({name: "Josh Test User"});
User.createNewUser({name: "Jane Doe"})
