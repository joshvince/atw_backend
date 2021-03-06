// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const AWS_REGION = process.env.AWS_REGION 
const AWS_ENDPOINT = process.env.AWS_DB_ENDPOINT 
const STORIES_TABLE_NAME = process.env.STORIES_TABLE_NAME

var AWS = require("aws-sdk");
AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT
});
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : STORIES_TABLE_NAME,
    KeySchema: [       
        { AttributeName: "uuid", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "uuid", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});